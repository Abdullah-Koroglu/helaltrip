"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingSearchForm, BookingSearchParams } from "@/components/booking-search-form"
import { fetchHotelPrice, RoomOffer } from "@/lib/price-api"
import { Hotel } from "@/lib/hotel-data"
import { Loader2, XCircle, Bed, Utensils, X } from "lucide-react"
import Image from "next/image"
import { useLocalePath } from "./hooks/useLocalePath"
import { useTranslations, useLocale } from "next-intl"

interface HotelBookingSidebarProps {
  hotel: Hotel
}

export function HotelBookingSidebar({ hotel }: HotelBookingSidebarProps) {

  const { withLocale } = useLocalePath()
  const t = useTranslations("HotelSidebar")
  const locale = useLocale()

  const [offers, setOffers] = useState<RoomOffer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<BookingSearchParams | null>(null)

  const [showAll, setShowAll] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const openImage = (url: string) => {
    setActiveImage(url)
    setShowImageModal(true)
  }

  const closeImage = () => {
    setShowImageModal(false)
    setActiveImage(null)
  }

  const handleSearch = async (params: BookingSearchParams) => {
    setLoading(true)
    setError(null)
    setOffers([])
    setSearchParams(params)
    setShowAll(false)

    try {
      const priceRequest = {
        hotelId: hotel.priceId || "31",
        checkin: params.checkin,
        checkout: params.checkout,
        adults: params.adults.toString(),
        children: params.children,
        childrenAges: params.childrenAges,
        discountPercentage: "0",
        currency: "TRY",
        customerCountryCode: "TR",
        locale: locale || 'tr'
      }

      const response = await fetchHotelPrice(priceRequest)

      if (response.error || !response.success) {
        setError(response.error || t("priceError"))
        setLoading(false)
        return
      }

      const offers = response.data?.offers ?? []

      if (offers.length > 0) {
        setOffers(offers)
      } else {
        setError(t("noRoom"))
      }
      

    } catch (err) {
      setError(err instanceof Error ? err.message : t("genericError"))
    } finally {
      setLoading(false)
    }
  }

  const handleRoomSelect = (offer: RoomOffer) => {
    if (!searchParams) return

    const params = new URLSearchParams({
      checkin: searchParams.checkin,
      checkout: searchParams.checkout,
      adults: searchParams.adults.toString(),
      children: searchParams.children.toString(),
      childrenAges: searchParams.childrenAges.join(","),
      roomId: offer.roomId.toString(),
      roomName: offer.roomName,
      mealPlan: offer.mealPlan,
      price: offer.discountedPrice.toString(),
    })

    window.location.href = withLocale(
      `/otel/${hotel.slug}/rezervasyon?${params.toString()}`
    )
  }

  const calculateNights = () => {
    if (!searchParams) return 0

    const checkIn = new Date(searchParams.checkin)
    const checkOut = new Date(searchParams.checkout)

    const diffTime = checkOut.getTime() - checkIn.getTime()

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const visibleOffers = showAll ? offers : offers.slice(0, 6)

  return (
    <div className="space-y-6 mb-8">

      {hotel.priceId && (
        <BookingSearchForm hotel={hotel} onSearch={handleSearch} />
      )}

      {/* Loading */}
      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t("loading")}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offers */}
      {visibleOffers.length > 0 && !loading && !error && (
        <Card>

          <CardHeader>

            <CardTitle className="flex items-center">
              <Bed className="w-5 h-5 mr-2" />
              {t("roomOptions")} ({offers.length})
            </CardTitle>

            {searchParams && (
              <div className="text-sm text-gray-600 mt-2">

                {calculateNights()} {t("night")} • {searchParams.adults} {t("adult")}

                {searchParams.children > 0 &&
                  `, ${searchParams.children} ${t("child")}`}
              </div>
            )}

          </CardHeader>

          <CardContent>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {visibleOffers.map((offer, index) => (

                <Card
                  key={offer.roomId || index}
                  className="border hover:shadow-lg transition-all duration-200 rounded-xl cursor-pointer overflow-hidden"
                >

                  <CardContent className="p-0">

                    {/* Main Image */}
                    <div className="relative w-full h-40 md:h-48 overflow-hidden">
                      <Image
                        src={offer.image}
                        alt={offer.roomName}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="p-4 space-y-4">

                      {/* Room Name */}
                      <h3 className="font-semibold text-xl text-gray-900">
                        {offer.roomName}
                      </h3>

                      {/* Meal Plan */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Utensils className="w-4 h-4 mr-1" />
                        <span>{offer.mealPlan}</span>
                      </div>

                      {/* Cancellation */}
                      {offer.cancellationPolicy && (
                        <p className="text-xs text-gray-500">
                          {offer.cancellationPolicy}
                        </p>
                      )}

                      {/* Thumbnails */}
                      {offer.photos && offer.photos.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-1">

                          {offer.photos.map((photo, idx) => (

                            <div
                              key={idx}
                              className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                openImage(photo)
                              }}
                            >
                              <Image
                                src={photo}
                                alt={`${offer.roomName} photo ${idx}`}
                                fill
                                className="object-cover border hover:scale-110 transition-transform"
                              />
                            </div>

                          ))}

                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-end justify-between mt-4">

                        <div>

                          {offer.discountPercentage !== "0" && (
                            <div className="text-sm text-gray-400 line-through">
                              ₺{offer.originalPrice.toLocaleString(locale === "en" ? "en-US" : "tr-TR")}
                            </div>
                          )}

                          <div className="text-2xl font-bold text-blue-600">
                            ₺{offer.discountedPrice.toLocaleString(locale === "en" ? "en-US" : "tr-TR")}
                          </div>

                          <div className="text-xs text-gray-500">
                            {calculateNights()} {t("night")}
                          </div>

                          <div className="text-xs text-green-600 font-medium mt-1 pt-1 pl-1">
                            {t("welcomeDiscount")}
                          </div>

                        </div>

                        {/* Select */}
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRoomSelect(offer)
                          }}
                        >
                          {t("select")}
                        </Button>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              ))}

            </div>

            {/* Show More */}
            {offers.length > 6 && (
              <div className="flex justify-center mt-4">

                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? t("showLess") : t("showMore")}
                </Button>

              </div>
            )}

          </CardContent>

        </Card>
      )}

      {/* Image Modal */}
      {showImageModal && activeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeImage}
        >

          <div className="relative max-w-4xl max-h-[90vh]">

            <Image
              src={activeImage}
              alt="room"
              width={1200}
              height={900}
              className="rounded-lg object-contain max-h-[90vh] mx-auto"
            />

            <button
              className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-lg text-sm"
              onClick={(e) => {
                e.stopPropagation()
                closeImage()
              }}
            >
              <X size={18} />
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
