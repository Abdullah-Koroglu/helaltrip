"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, Home, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useLocalePath } from "@/components/hooks/useLocalePath"

interface PaymentData {
  hotel: {
    slug: string
  }
  checkin: string
  checkout: string
  adults: string
  children: string
}

export default function PaymentErrorPage() {
  const { withLocale } = useLocalePath()
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get payment data from sessionStorage
    const storedData = sessionStorage.getItem("paymentData") || sessionStorage.getItem("bookingData")
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setPaymentData(data)
      } catch (error) {
        console.error("Error parsing payment data:", error)
      }
    }
    setLoading(false)
  }, [])

  const handleRetry = () => {
    if (paymentData?.hotel?.slug) {
      router.push(`/otel/${paymentData.hotel.slug}/odeme`)
    } else {
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Ödeme Başarısız
                  </h1>
                  <p className="text-lg text-gray-600">
                    Ödeme işlemi sırasında bir hata oluştu
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 mt-8">
                  <div className="text-left space-y-4">
                    <h2 className="font-semibold text-lg mb-3">Olası Nedenler:</h2>
                    <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                      <li>Kart bilgileriniz hatalı olabilir</li>
                      <li>Kart limitiniz yetersiz olabilir</li>
                      <li>İnternet bağlantınızda sorun olabilir</li>
                      <li>Banka tarafından işlem reddedilmiş olabilir</li>
                    </ul>

                    <div className="bg-yellow-50 rounded-lg p-4 mt-4">
                      <p className="text-sm text-yellow-800">
                        Lütfen kart bilgilerinizi kontrol edip tekrar deneyin. Sorun
                        devam ederse, lütfen bizimle iletişime geçin.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button
                    onClick={handleRetry}
                    size="lg"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Tekrar Dene
                  </Button>
                  <Link href={withLocale("/")}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Ana Sayfaya Dön
                    </Button>
                  </Link>
                  {paymentData?.hotel?.slug && (
                    <Link href={withLocale(`/otel/${paymentData.hotel.slug}/rezervasyon?checkin=${paymentData.checkin}&checkout=${paymentData.checkout}&adults=${paymentData.adults}&children=${paymentData.children}`)}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Rezervasyona Dön
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-600">
                    Sorun yaşıyorsanız{" "}
                    <Link href={withLocale("/iletisim")} className="text-blue-600 hover:underline">
                      iletişim sayfamızdan
                    </Link>{" "}
                    bize ulaşabilirsiniz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

