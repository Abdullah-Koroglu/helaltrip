"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingSearchForm, BookingSearchParams } from "@/components/booking-search-form"
import { fetchHotelPrice, RoomOffer } from "@/lib/price-api"
import { Hotel } from "@/lib/hotel-data"
import { Loader2, CheckCircle, XCircle, DollarSign, Bed, Utensils, Calendar } from "lucide-react"
import Image from "next/image"

interface HotelBookingSidebarProps {
  hotel: Hotel
}

export function HotelBookingSidebar({ hotel }: HotelBookingSidebarProps) {
  const [offers, setOffers] = useState<RoomOffer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<BookingSearchParams | null>(null)

  const handleSearch = async (params: BookingSearchParams) => {
    setLoading(true)
    setError(null)
    setOffers([])
    setSearchParams(params)

    try {
      const priceRequest = {
        hotelId: hotel.priceId,
        checkin: params.checkin,
        checkout: params.checkout,
        adults: params.adults.toString(),
        children: params.children.toString(),
        childrenAges: params.childrenAges,
        discountPercentage: "0",
        currency: "TRY",
        customerCountryCode: "TR",
      }

      const response = await fetchHotelPrice(priceRequest)

      if (response.error || !response.success) {
        setError(response.error || "Fiyat alınamadı")
        setLoading(false)
        return
      }

      if (response.data && response.data.offers && response.data.offers.length > 0) {
        setOffers(response.data.offers)
      } else {
        setError("Oda seçeneği bulunamadı")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
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
    window.location.href = `/otel/${hotel.slug}/rezervasyon?${params.toString()}`
  }

  const calculateNights = () => {
    if (!searchParams) return 0
    const checkIn = new Date(searchParams.checkin)
    const checkOut = new Date(searchParams.checkout)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="space-y-6">
      <BookingSearchForm hotel={hotel} onSearch={handleSearch} />

      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Fiyat alınıyor...</span>
            </div>
          </CardContent>
        </Card>
      )}

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

      {offers.length > 0 && !loading && !error && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bed className="w-5 h-5 mr-2" />
              Oda Seçenekleri ({offers.length})
            </CardTitle>
            {searchParams && (
              <div className="text-sm text-gray-600 mt-2">
                {calculateNights()} gece • {searchParams.adults} yetişkin
                {searchParams.children > 0 && `, ${searchParams.children} çocuk`}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {offers.map((offer, index) => (
                <Card
                  key={offer.roomId || index}
                  className="border hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => handleRoomSelect(offer)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {offer.image && (
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={offer.image}
                            alt={offer.roomName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{offer.roomName}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Utensils className="w-4 h-4 mr-1" />
                          <span>{offer.mealPlan}</span>
                        </div>
                        {offer.cancellationPolicy && (
                          <p className="text-xs text-gray-500 mb-2">
                            {offer.cancellationPolicy}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            {offer.discountPercentage !== "0" && (
                              <div className="text-sm text-gray-400 line-through">
                                ₺{offer.originalPrice.toLocaleString("tr-TR")}
                              </div>
                            )}
                            <div className="text-xl font-bold text-blue-600">
                              ₺{offer.discountedPrice.toLocaleString("tr-TR")}
                            </div>
                            <div className="text-xs text-gray-500">
                              {calculateNights()} gece
                            </div>
                          </div>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRoomSelect(offer)
                            }}
                          >
                            Seç
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

