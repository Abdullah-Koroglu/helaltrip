"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Lock, Shield, Calendar, Users, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { PayTRIntegration } from "@/components/paytr-integration"
import { Hotel } from "@/lib/hotel-data"

interface BookingData {
  hotel: Hotel
  checkin: string
  checkout: string
  adults: string
  children: string
  childrenAges: number[]
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
    phone: string
    email: string
    address?: string
    city?: string
    country?: string
    notes?: string
  }
}

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<"creditcard" | "paytr">("paytr")

  // Credit card form data
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    email: "",
  })

  useEffect(() => {
    // Get booking data from sessionStorage
    const storedData = sessionStorage.getItem("bookingData")
    if (!storedData) {
      // Redirect to home if no booking data
      router.push("/")
      return
    }

    try {
      const data = JSON.parse(storedData)
      setBookingData(data)
      // Pre-fill email from customer data
      if (data.customer?.email) {
        setCardData((prev) => ({ ...prev, email: data.customer.email }))
      }
    } catch (error) {
      console.error("Error parsing booking data:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleCardInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    handleCardInputChange("cardNumber", formatted)
  }

  const handleCreditCardSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !cardData.cardNumber ||
      !cardData.cardName ||
      !cardData.expiryMonth ||
      !cardData.expiryYear ||
      !cardData.cvv ||
      !cardData.email
    ) {
      alert("Lütfen tüm alanları doldurun")
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cardData.email)) {
      alert("Lütfen geçerli bir email adresi girin")
      return
    }

    // Validate card number (basic check)
    const cardNumber = cardData.cardNumber.replace(/\s/g, "")
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      alert("Lütfen geçerli bir kredi kartı numarası girin")
      return
    }

    // Validate CVV
    if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
      alert("Lütfen geçerli bir CVV girin")
      return
    }

    // Simulate payment processing
    // In a real application, you would send this to your payment gateway
    setTimeout(() => {
      // For now, we'll simulate a successful payment
      // In production, you would handle the actual payment processing here
      const success = Math.random() > 0.3 // 70% success rate for demo

      if (success) {
        // Store payment data
        const paymentData = {
          ...bookingData,
          payment: {
            method: "creditcard",
            cardNumber: cardData.cardNumber.replace(/\s/g, "").slice(-4), // Last 4 digits
            email: cardData.email,
          },
        }
        sessionStorage.setItem("paymentData", JSON.stringify(paymentData))
        router.push(`/otel/${bookingData?.hotel?.slug}/odeme/basarili`)
      } else {
        router.push(`/otel/${bookingData?.hotel?.slug}/odeme/hata`)
      }
    }, 2000)
  }

  const handlePayTRSuccess = (response: any) => {
    // Store payment data
    const paymentData = {
      ...bookingData,
      payment: {
        method: "paytr",
        response,
      },
    }
    sessionStorage.setItem("paymentData", JSON.stringify(paymentData))
    router.push(`/otel/${bookingData?.hotel?.slug}/odeme/basarili`)
  }

  const handlePayTRError = (error: any) => {
    console.error("PayTR Error:", error)
    router.push(`/otel/${bookingData?.hotel?.slug}/odeme/hata`)
  }

  const calculateNights = () => {
    if (!bookingData?.checkin || !bookingData?.checkout) return 0
    const checkIn = new Date(bookingData.checkin)
    const checkOut = new Date(bookingData.checkout)
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

  if (!bookingData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/otel/${bookingData.hotel.slug}/rezervasyon?checkin=${bookingData.checkin}&checkout=${bookingData.checkout}&adults=${bookingData.adults}&children=${bookingData.children}&childrenAges=${bookingData.childrenAges.join(",")}`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Ödeme</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Ödeme Yöntemi Seçin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="paytr"
                      name="paymentMethod"
                      value="paytr"
                      checked={paymentMethod === "paytr"}
                      onChange={(e) => setPaymentMethod(e.target.value as "paytr")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="paytr" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                        <span className="font-semibold">PayTR ile Güvenli Ödeme</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        PayTR ile güvenli ve hızlı ödeme yapın
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="creditcard"
                      name="paymentMethod"
                      value="creditcard"
                      checked={paymentMethod === "creditcard"}
                      onChange={(e) => setPaymentMethod(e.target.value as "creditcard")}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="creditcard" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="font-semibold">Kredi Kartı ile Ödeme</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Kredi kartı bilgilerinizi girin
                      </p>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PayTR Integration */}
            {paymentMethod === "paytr" && bookingData && (
              <PayTRIntegration
                amount={bookingData.price}
                bookingData={{
                  ...bookingData.customer,
                  checkIn: bookingData.checkin,
                  checkOut: bookingData.checkout,
                  rooms: 1,
                }}
                hotel={bookingData.hotel}
                onSuccess={handlePayTRSuccess}
                onError={handlePayTRError}
              />
            )}

            {/* Credit Card Form */}
            {paymentMethod === "creditcard" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Kredi Kartı Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreditCardSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Kart Numarası *</Label>
                      <Input
                        id="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Kart Üzerindeki İsim *</Label>
                      <Input
                        id="cardName"
                        value={cardData.cardName}
                        onChange={(e) => handleCardInputChange("cardName", e.target.value)}
                        placeholder="JOHN DOE"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Ay *</Label>
                        <Input
                          id="expiryMonth"
                          type="number"
                          min="1"
                          max="12"
                          value={cardData.expiryMonth}
                          onChange={(e) => handleCardInputChange("expiryMonth", e.target.value)}
                          placeholder="MM"
                          maxLength={2}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Yıl *</Label>
                        <Input
                          id="expiryYear"
                          type="number"
                          min={new Date().getFullYear()}
                          value={cardData.expiryYear}
                          onChange={(e) => handleCardInputChange("expiryYear", e.target.value)}
                          placeholder="YYYY"
                          maxLength={4}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={cardData.email}
                        onChange={(e) => handleCardInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">
                          Güvenli Ödeme
                        </span>
                      </div>
                      <p className="text-xs text-blue-700">
                        256-bit SSL şifreleme ile verileriniz korunmaktadır
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Ödemeyi Tamamla
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rezervasyon Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{bookingData.hotel.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {bookingData.hotel.location}
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{bookingData.hotel.rating}</span>
                    </div>
                  </div>

                  {bookingData.room && (
                    <div className="border-t pt-4 pb-4">
                      <div className="text-sm font-semibold mb-2">Seçilen Oda:</div>
                      <div className="text-sm text-gray-700 mb-1">{bookingData.room.roomName}</div>
                      <div className="text-xs text-gray-600">{bookingData.room.mealPlan}</div>
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Giriş:
                      </span>
                      <span>{new Date(bookingData.checkin).toLocaleDateString("tr-TR")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Çıkış:
                      </span>
                      <span>{new Date(bookingData.checkout).toLocaleDateString("tr-TR")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Misafir:
                      </span>
                      <span>
                        {bookingData.adults} yetişkin
                        {parseInt(bookingData.children) > 0 &&
                          `, ${bookingData.children} çocuk`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Gece:</span>
                      <span>{calculateNights()} gece</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Toplam Tutar:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₺{bookingData.price.toLocaleString("tr-TR")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-green-800">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-semibold">Güvenli Ödeme Garantisi</span>
                </div>
                <p className="text-xs text-green-700 mt-2">
                  Tüm ödemeleriniz SSL şifreleme ile korunmaktadır
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

