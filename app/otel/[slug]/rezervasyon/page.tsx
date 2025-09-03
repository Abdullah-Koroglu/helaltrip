"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { hotels } from "@/lib/hotel-data"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Calendar, Users, CreditCard, Shield } from "lucide-react"
import Link from "next/link"

interface BookingPageProps {
  params: {
    slug: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  const hotel = hotels.find(h => h.slug === params.slug)

  if (!hotel) {
    notFound()
  }

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  })

  const [currentStep, setCurrentStep] = useState(1)

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0
    const checkIn = new Date(bookingData.checkIn)
    const checkOut = new Date(bookingData.checkOut)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    return hotel.price * nights * bookingData.rooms
  }

  const handleInputChange = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePayment = () => {
    // PayTR integration would go here
    alert("PayTR ödeme sistemi entegrasyonu burada olacak")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{hotel.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </CardDescription>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(hotel.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {currentStep === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giriş Tarihi
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => handleInputChange("checkIn", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Çıkış Tarihi
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => handleInputChange("checkOut", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Guests and Rooms */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Misafir Sayısı
                        </label>
                        <select
                          value={bookingData.guests}
                          onChange={(e) => handleInputChange("guests", parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} Kişi</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Oda Sayısı
                        </label>
                        <select
                          value={bookingData.rooms}
                          onChange={(e) => handleInputChange("rooms", parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num} Oda</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Kişisel Bilgiler</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad
                          </label>
                          <input
                            type="text"
                            value={bookingData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-posta
                          </label>
                          <input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Özel İstekler
                        </label>
                        <textarea
                          value={bookingData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Varsa özel isteklerinizi belirtebilirsiniz..."
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Devam Et
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Rezervasyon Özeti</h3>
                      <p className="text-gray-600">Bilgilerinizi kontrol edin ve ödeme yapın</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Giriş Tarihi:</span>
                        <span className="font-medium">{bookingData.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Çıkış Tarihi:</span>
                        <span className="font-medium">{bookingData.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gece Sayısı:</span>
                        <span className="font-medium">{calculateNights()} gece</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Misafir:</span>
                        <span className="font-medium">{bookingData.guests} kişi</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oda:</span>
                        <span className="font-medium">{bookingData.rooms} oda</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Geri Dön
                      </Button>
                      <Button
                        onClick={handlePayment}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Ödeme Yap
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Fiyat Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Oda Fiyatı (gece):</span>
                    <span>₺{hotel.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gece Sayısı:</span>
                    <span>{calculateNights()} gece</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oda Sayısı:</span>
                    <span>{bookingData.rooms} oda</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam:</span>
                    <span>₺{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Info */}
            <Card>
              <CardHeader>
                <CardTitle>Otel Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{hotel.rating} / 5</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{hotel.amenities.length} olanak</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle>İptal Politikası</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• 24 saat öncesine kadar ücretsiz iptal</p>
                  <p>• 24 saatten az sürede %50 ücret</p>
                  <p>• Giriş günü iptal durumunda %100 ücret</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 