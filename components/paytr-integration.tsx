"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Lock, Shield } from "lucide-react"

interface PayTRIntegrationProps {
  amount: number
  bookingData: any
  hotel: any
  onSuccess: (response: any) => void
  onError: (error: any) => void
}

export function PayTRIntegration({ amount, bookingData, hotel, onSuccess, onError }: PayTRIntegrationProps) {
  useEffect(() => {
    // PayTR script loading
    const script = document.createElement('script')
    script.src = 'https://www.paytr.com/js/iframeResizer.min.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handlePayment = () => {
    // PayTR configuration
    const paytrConfig = {
      merchant_id: process.env.NEXT_PUBLIC_PAYTR_MERCHANT_ID || 'your_merchant_id',
      user_ip: '127.0.0.1', // In production, get real IP
      merchant_oid: `booking_${Date.now()}`,
      email: bookingData.email,
      payment_amount: amount * 100, // PayTR expects amount in kuruş
      currency: 'TL',
      test_mode: '1', // Set to 0 for production
      no_installment: '0',
      max_installment: '0',
      user_name: bookingData.name,
      user_address: hotel.location,
      user_phone: bookingData.phone,
      merchant_ok_url: `${window.location.origin}/payment/success`,
      merchant_fail_url: `${window.location.origin}/payment/fail`,
      user_basket: JSON.stringify([
        {
          hotel_name: hotel.name,
          room_count: bookingData.rooms,
          nights: calculateNights(),
          price: amount
        }
      ]),
      debug_on: '1',
      lang: 'tr',
      timeout_limit: '30'
    }

    // Create form and submit to PayTR
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://www.paytr.com/odeme/guvenli'

    Object.entries(paytrConfig).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value as string
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0
    const checkIn = new Date(bookingData.checkIn)
    const checkOut = new Date(bookingData.checkOut)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Güvenli Ödeme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">PayTR Güvenlik</span>
            </div>
            <p className="text-sm text-blue-700">
              PayTR ile %100 güvenli ödeme yapın. SSL şifreleme ve PCI DSS uyumluluğu ile verileriniz korunur.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Toplam Tutar:</span>
              <span className="font-bold text-lg">₺{amount.toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-600">
              {calculateNights()} gece x {bookingData.rooms} oda
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>256-bit SSL şifreleme ile korunmaktadır</span>
          </div>

          <Button 
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            PayTR ile Öde
          </Button>

          <div className="text-xs text-gray-500 text-center">
            Ödeme sayfasına yönlendirileceksiniz
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 