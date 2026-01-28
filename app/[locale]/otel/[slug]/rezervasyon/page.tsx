"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { notFound } from "next/navigation"
import { hotels, Hotel } from "@/lib/hotel-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, ArrowLeft, User, Phone, Mail, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { fetchHotelPrice } from "@/lib/price-api"
import { useTranslations } from "next-intl"
import { useLocalePath } from "@/components/hooks/useLocalePath"

export default function BookingPage() {
  const t = useTranslations("Booking")
  const { withLocale } = useLocalePath()

  const router = useRouter()
  const searchParams = useSearchParams()

  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState<number | null>(null)
  const [priceLoading, setPriceLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "TR",
    notes: "",
  })

  const checkin = searchParams.get("checkin")
  const checkout = searchParams.get("checkout")
  const adults = searchParams.get("adults")
  const children = parseInt(searchParams.get("children") || "")
  const childrenAges =
    searchParams.get("childrenAges")?.split(",").map(Number) || []

  const roomId = searchParams.get("roomId")
  const roomName = searchParams.get("roomName")
  const mealPlan = searchParams.get("mealPlan")
  const priceParam = searchParams.get("price")

  const [slug, setSlug] = useState<string | null>(null)

  const [selectedRoom, setSelectedRoom] = useState<{
    roomId: string
    roomName: string
    mealPlan: string
    price: number
  } | null>(null)

  useEffect(() => {
    const pathSlug = window.location.pathname.split("/")[3]
    setSlug(pathSlug)

    if (roomId && roomName && mealPlan && priceParam) {
      setSelectedRoom({
        roomId,
        roomName,
        mealPlan,
        price: parseFloat(priceParam) || 0,
      })

      setPrice(parseFloat(priceParam) || null)
    }
  }, [roomId, roomName, mealPlan, priceParam])

  useEffect(() => {
    if (!slug) return

    const foundHotel = hotels.find((h) => h.slug === slug)

    if (!foundHotel) {
      setLoading(false)
      return
    }

    setHotel(foundHotel)

    if (checkin && checkout && adults) {
      fetchPrice(foundHotel)
    }

    setLoading(false)
  }, [slug, checkin, checkout, adults])

  const fetchPrice = async (hotelData: Hotel) => {
    if (!checkin || !checkout || !adults) return

    setPriceLoading(true)

    try {
      const priceRequest = {
        hotelId: hotelData.priceId || "31",
        checkin,
        checkout,
        adults,
        children: children || 0,
        childrenAges,
        discountPercentage: "0",
        currency: "TRY",
        customerCountryCode: "TR",
      }

      await fetchHotelPrice(priceRequest)
    } catch (error) {
      console.error(error)
    } finally {
      setPriceLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.surname ||
      !formData.phone ||
      !formData.email
    ) {
      alert(t("validationRequired"))
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email)) {
      alert(t("validationEmail"))
      return
    }

    const bookingData = {
      hotel,
      checkin,
      checkout,
      adults,
      children,
      childrenAges,
      price: selectedRoom?.price || price,
      room: selectedRoom,
      customer: formData,
    }

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))

    router.push(withLocale(`/otel/${slug}/odeme`))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4">{t("loading")}</p>
        </div>
      </div>
    )
  }

  if (!hotel) notFound()

  const calculateNights = () => {
    if (!checkin || !checkout) return 0

    const inDate = new Date(checkin)
    const outDate = new Date(checkout)

    return Math.ceil(
      (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <Link href={`/otel/${hotel.slug}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("goBack")}
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mt-4">
          {t("title")}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* FORM */}
          <div className="lg:col-span-2">

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  {t("customerInfo")}
                </CardTitle>
              </CardHeader>

              <CardContent>

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid md:grid-cols-2 gap-4">

                    <div>
                      <Label>{t("firstName")}</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>{t("lastName")}</Label>
                      <Input
                        value={formData.surname}
                        onChange={(e) =>
                          handleInputChange("surname", e.target.value)
                        }
                      />
                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4">

                    <div>
                      <Label className="flex items-center">
                        <Phone className="mr-2 w-4 h-4" />
                        {t("phone")}
                      </Label>

                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label className="flex items-center">
                        <Mail className="mr-2 w-4 h-4" />
                        {t("email")}
                      </Label>

                      <Input
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>

                  </div>

                  <div>
                    <Label>{t("address")}</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">

                    <div>
                      <Label>{t("city")}</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>{t("country")}</Label>
                      <Input
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                      />
                    </div>

                  </div>

                  <div>
                    <Label>{t("notes")}</Label>
                    <Textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {t("submit")}
                  </Button>

                </form>

              </CardContent>
            </Card>

          </div>

          {/* SUMMARY */}
          <div>

            <Card>

              <CardHeader>
                <CardTitle>{t("summary")}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <h3 className="font-semibold">{hotel.name}</h3>

                <p className="flex items-center text-sm">
                  <MapPin className="mr-1 w-4 h-4" />
                  {hotel.location}
                </p>

                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {hotel.rating}
                </div>

                {selectedRoom && (
                  <div>
                    <strong>{t("selectedRoom")}</strong>
                    <div>{selectedRoom.roomName}</div>
                  </div>
                )}

                <div className="space-y-2 border-t pt-4">

                  <div className="flex justify-between">
                    {t("checkin")}
                    <span>
                      {checkin
                        ? new Date(checkin).toLocaleDateString()
                        : t("notSpecified")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    {t("checkout")}
                    <span>
                      {checkout
                        ? new Date(checkout).toLocaleDateString()
                        : t("notSpecified")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    {t("guests")}
                    <span>
                      {adults} {t("adult")}
                      {children > 0 && `, ${children} ${t("child")}`}
                    </span>
                  </div>

                  <div className="flex justify-between font-semibold">
                    {t("nights")}
                    <span>
                      {calculateNights()} {t("night")}
                    </span>
                  </div>

                </div>

                {(selectedRoom?.price || price) && (
                  <div className="border-t pt-4 flex justify-between">

                    <strong>{t("total")}</strong>

                    <span className="text-xl text-blue-600 font-bold">
                      ₺{(selectedRoom?.price || price)?.toLocaleString()}
                    </span>

                  </div>
                )}

              </CardContent>

            </Card>

          </div>

        </div>

      </div>
    </div>
  )
}
