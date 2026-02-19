"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLocalePath } from "@/components/hooks/useLocalePath"
import { formatCurrency } from "@/lib/utils"

export default function ReservationConfirmPage() {
  const router = useRouter()
  const params = useSearchParams()
  const locale = useLocale()
  const t = useTranslations("ReservationConfirm")
  const { withLocale } = useLocalePath()


  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData")

    if (!storedData) {
      router.push(withLocale("/"))
      return
    }

    try {
      const data = JSON.parse(storedData)
      setBookingData(data)
    } catch (error) {
      console.error("Error parsing booking data:", error)
      router.push(withLocale("/"))
    } finally {
      setLoading(false)
    }
  }, [router])

  if (!bookingData) {
    return (
      <div className="container mx-auto py-12">
        {t("notFound")}
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
        router.push(
          withLocale(`/otel/${bookingData.hotel.slug}/rezervasyon/basarili`)
        )
      } else {
        alert(t("mailError"))
      }
    } catch (e) {
      alert(t("generalError"))
    }
  }

  return (
    <div className="container mx-auto py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Sol Kolon */}
      <div className="lg:col-span-2 space-y-6">

        {/* Otel Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle>{t("hotelInfo.title")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>{t("hotelInfo.hotel")}:</strong>{" "}
              {bookingData.hotel.name}
            </p>

            <p>
              <strong>{t("hotelInfo.room")}:</strong>{" "}
              {bookingData.room.roomName} ({bookingData.room.mealPlan})
            </p>

            <p>
              <strong>{t("hotelInfo.checkin")}:</strong>{" "}
              {new Date(bookingData.checkin).toLocaleDateString(
                locale === "tr" ? "tr-TR" : "en-US"
              )}
            </p>

            <p>
              <strong>{t("hotelInfo.checkout")}:</strong>{" "}
              {new Date(bookingData.checkout).toLocaleDateString(
                locale === "tr" ? "tr-TR" : "en-US"
              )}
            </p>

            <p>
              <strong>{t("hotelInfo.guests")}:</strong>{" "}
              {bookingData.adults} {t("hotelInfo.adult")},{" "}
              {bookingData.children} {t("hotelInfo.child")}
            </p>

            {bookingData.childrenAges?.length > 0 && (
              <p>
                <strong>{t("hotelInfo.childrenAges")}:</strong>{" "}
                {bookingData.childrenAges.join(", ")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Müşteri Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle>{t("customerInfo.title")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>{t("customerInfo.name")}:</strong>{" "}
              {bookingData.customer.name}{" "}
              {bookingData.customer.surname}
            </p>

            <p>
              <strong>{t("customerInfo.email")}:</strong>{" "}
              {bookingData.customer.email}
            </p>

            <p>
              <strong>{t("customerInfo.phone")}:</strong>{" "}
              {bookingData.customer.phone}
            </p>

            {bookingData.customer.notes && (
              <p>
                <strong>{t("customerInfo.note")}:</strong>{" "}
                {bookingData.customer.notes}
              </p>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Sağ Kolon */}
      <div className="lg:col-span-1">

        <Card>
          <CardHeader>
            <CardTitle>{t("confirm.title")}</CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-sm mb-4">
              {t("confirm.description")}
            </p>

            <div className="text-xl font-semibold mb-4">
              {t("confirm.totalPrice")}: ₺{formatCurrency(bookingData.price)}
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {t("confirm.button")}
            </Button>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}
