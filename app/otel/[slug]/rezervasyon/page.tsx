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

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState<number | null>(null)
  const [priceLoading, setPriceLoading] = useState(false)

  // Form data
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

  // Get URL params
  const checkin = searchParams.get("checkin")
  const checkout = searchParams.get("checkout")
  const adults = searchParams.get("adults")
  const children = parseInt(searchParams.get("children") || "")
  const childrenAges = searchParams.get("childrenAges")?.split(",").map(Number) || []
  const roomId = searchParams.get("roomId")
  const roomName = searchParams.get("roomName")
  const mealPlan = searchParams.get("mealPlan")
  const priceParam = searchParams.get("price")
  
  // Get slug from URL path
  const [slug, setSlug] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<{
    roomId: string
    roomName: string
    mealPlan: string
    price: number
  } | null>(null)
  
  useEffect(() => {
    const pathSlug = window.location.pathname.split("/")[2]
    setSlug(pathSlug)
    
    // Set selected room if params are available
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
    
    // Find hotel by slug
    const foundHotel = hotels.find((h) => h.slug === slug)
    if (!foundHotel) {
      setLoading(false)
      return
    }

    setHotel(foundHotel)

    // Fetch price if we have all required params
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
        hotelId: hotelData.priceId,
        checkin,
        checkout,
        adults,
        children: children || 0,
        childrenAges,
        discountPercentage: "0",
        currency: "TRY",
        customerCountryCode: "TR",
      }

      const response = await fetchHotelPrice(priceRequest)

      // if (response.error) {
      //   console.error("Price fetch error:", response.error)
      // } else {
      //   const extractedPrice = response?.price || response.totalPrice || response.amount || response.totalAmount || null
      //   if (extractedPrice !== null && extractedPrice !== undefined) {
      //     // Convert to number if it's a string
      //     const priceValue = typeof extractedPrice === 'string' ? parseFloat(extractedPrice) : extractedPrice
      //     if (!isNaN(priceValue) && priceValue > 0) {
      //       setPrice(priceValue)
      //     }
      //   }
      // }
    } catch (error) {
      console.error("Error fetching price:", error)
    } finally {
      setPriceLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.surname || !formData.phone || !formData.email) {
      alert("Lütfen tüm gerekli alanları doldurun")
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Lütfen geçerli bir email adresi girin")
      return
    }

    // Navigate to payment page with booking data
    const bookingData = {
      hotel: hotel,
      checkin,
      checkout,
      adults,
      children,
      childrenAges,
      price: selectedRoom?.price || price,
      room: selectedRoom,
      customer: formData,
    }

    // Store booking data in sessionStorage
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))

    // Navigate to payment page
    router.push(`/otel/${slug}/odeme`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!hotel) {
    notFound()
  }

  const calculateNights = () => {
    if (!checkin || !checkout) return 0
    const checkIn = new Date(checkin)
    const checkOut = new Date(checkout)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/otel/${hotel.slug}`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Rezervasyon Bilgileri</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="surname">Soyad *</Label>
                      <Input
                        id="surname"
                        value={formData.surname}
                        onChange={(e) => handleInputChange("surname", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="05XX XXX XX XX"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Şehir</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Özel İstekler veya Notlar</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Onay Sayfasına Geç
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hotel Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Rezervasyon Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{hotel.rating}</span>
                    </div>
                  </div>

                  {selectedRoom && (
                    <div className="border-t pt-4 pb-4">
                      <div className="text-sm font-semibold mb-2">Seçilen Oda:</div>
                      <div className="text-sm text-gray-700 mb-1">{selectedRoom.roomName}</div>
                      <div className="text-xs text-gray-600">{selectedRoom.mealPlan}</div>
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Giriş:
                      </span>
                      <span>
                        {checkin
                          ? new Date(checkin).toLocaleDateString("tr-TR")
                          : "Belirtilmedi"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Çıkış:
                      </span>
                      <span>
                        {checkout
                          ? new Date(checkout).toLocaleDateString("tr-TR")
                          : "Belirtilmedi"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Misafir:
                      </span>
                      <span>
                        {adults} yetişkin
                        {children && children > 0 && `, ${children} çocuk`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Gece:</span>
                      <span>{calculateNights()} gece</span>
                    </div>
                  </div>

                  {priceLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (selectedRoom?.price || price) !== null ? (
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Toplam Tutar:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ₺{(selectedRoom?.price || price || 0).toLocaleString("tr-TR")}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

