"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Calendar, Users, MapPin, Star, Mail, Camera } from "lucide-react"
import Link from "next/link"
import html2canvas from "html2canvas"

interface PaymentData {
  hotel: {
    name: string
    location: string
    rating: number
    slug: string
  }
  checkin: string
  checkout: string
  adults: string
  children: string
  price: number
  room?: {
    roomId: string
    roomName: string
    mealPlan: string
    price: number
  }
  customer: {
    name: string
    surname: string
    email: string
    phone: string
  }
  payment: {
    method: string
    [key: string]: any
  }
}

export default function PaymentSuccessPage() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get payment data from sessionStorage
    // const storedData = sessionStorage.getItem("paymentData")
    const storedData = sessionStorage.getItem("bookingData")
    if (!storedData) {
      // Redirect to home if no payment data
      router.push("/")
      return
    }

    try {
      const data = JSON.parse(storedData)
      setPaymentData(data)
    } catch (error) {
      console.error("Error parsing payment data:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleScreenshot = async () => {
    const element = document.getElementById("payment-success-wrapper")
    if (!element) return

    const canvas = await html2canvas(element, { scale: 2 })
    const dataURL = canvas.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = dataURL
    link.download = "rezervasyon-detayi.png"
    link.click()
  }

  const calculateNights = () => {
    if (!paymentData?.checkin || !paymentData?.checkout) return 0
    const checkIn = new Date(paymentData.checkin)
    const checkOut = new Date(paymentData.checkout)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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

  if (!paymentData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4">
      <div className="mx-auto px-4">
        <div className="flex justify-center mb-10">
          <Button onClick={handleScreenshot} variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Ekran Görüntüsü Al
          </Button>
        </div>

        <div id="payment-success-wrapper" className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Talep Başarılı!
                  </h1>
                  <p className="text-lg text-gray-600">
                    Rezervasyonunuz başarıyla oluşturuldu
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 mt-8 space-y-4">
                  <div className="text-left space-y-4">
                    <div>
                      <h2 className="font-semibold text-lg mb-3">Rezervasyon Detayları</h2>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Otel:</span>
                          <span className="font-semibold">{paymentData.hotel.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Konum:
                          </span>
                          <span>{paymentData.hotel.location}</span>
                        </div>
                        {paymentData.room && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Oda:</span>
                              <span className="font-semibold">{paymentData.room.roomName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Yemek Planı:</span>
                              <span>{paymentData.room.mealPlan}</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Giriş Tarihi:
                          </span>
                          <span>
                            {new Date(paymentData.checkin).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Çıkış Tarihi:
                          </span>
                          <span>
                            {new Date(paymentData.checkout).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Misafir:
                          </span>
                          <span>
                            {paymentData.adults} yetişkin
                            {parseInt(paymentData.children) > 0 &&
                              `, ${paymentData.children} çocuk`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Gece:</span>
                          <span className="font-semibold">{calculateNights()} gece</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-gray-600 font-semibold">Toplam Tutar:</span>
                          <span className="text-xl font-bold text-green-600">
                            ₺{paymentData.price.toLocaleString("tr-TR")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-2">Misafir Bilgileri</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Ad Soyad:</span>
                          <span>
                            {paymentData.customer.name} {paymentData.customer.surname}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            Email:
                          </span>
                          <span>{paymentData.customer.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Telefon:</span>
                          <span>{paymentData.customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-800">
                    Rezervasyon onayınız email adresinize gönderilmiştir. Lütfen email
                    kutunuzu kontrol edin.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/">
                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                      <Home className="w-4 h-4 mr-2" />
                      Ana Sayfaya Dön
                    </Button>
                  </Link>
                  {paymentData.hotel.slug && (
                    <Link href={`/otel/${paymentData.hotel.slug}`}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Otel Detayları
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

