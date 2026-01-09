"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReservationConfirmPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [loading, setLoading] = useState(true)

  const [bookingData, setBookingData] = useState<any>(null)

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
        // setCardData((prev) => ({ ...prev, email: data.customer.email }))
      }
    } catch (error) {
      console.error("Error parsing booking data:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  if (!bookingData) {
    return (
      <div className="container mx-auto py-12">
        Rezervasyon bilgileri bulunamadı.
      </div>
    )
  }

  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/send-reservation-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        router.push(`/otel/${bookingData.hotel.slug}/rezervasyon/basarili`)
      } else {
        alert("Mail gönderilirken bir hata oluştu.")
      }
    } catch (e) {
      alert("Bir hata oluştu.")
    }
  }

  console.log({bookingData});
  

  return (
    <div className="container mx-auto py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Sol kolon — Özellikler */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Otel Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>Otel:</strong> {bookingData.hotel.name}</p>
            <p><strong>Oda:</strong> {bookingData.room.roomName} ({bookingData.room.mealPlan})</p>
            <p><strong>Giriş:</strong> {new Date(bookingData.checkin).toLocaleDateString("tr-TR")}</p>
            <p><strong>Çıkış:</strong> {new Date(bookingData.checkout).toLocaleDateString("tr-TR")}</p>
            <p><strong>Misafir:</strong> {bookingData.adults} yetişkin, {bookingData.children} çocuk</p>
            {bookingData.childrenAges?.length > 0 && (
              <p><strong>Çocuk Yaşları:</strong> {bookingData.childrenAges.join(", ")}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Müşteri Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>Ad Soyad:</strong> {bookingData.customer.name} {bookingData.customer.surname}</p>
            <p><strong>Email:</strong> {bookingData.customer.email}</p>
            <p><strong>Telefon:</strong> {bookingData.customer.phone}</p>
            {bookingData.customer.notes && (
              <p><strong>Not:</strong> {bookingData.customer.notes}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sağ Kolon — Onay */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Rezervasyonu Onayla</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Lütfen bilgilerinizi kontrol edin. Her şey doğruysa aşağıdaki butona tıklayın.
            </p>

            <div className="text-xl font-semibold mb-4">
              Toplam Fiyat: ₺{bookingData.price}
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Rezervasyonu Onayla
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
