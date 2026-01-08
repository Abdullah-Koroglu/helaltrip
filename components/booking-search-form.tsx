"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Hotel } from "@/lib/hotel-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { hotels } from "@/lib/hotel-data"
import { DateRangePicker } from "./date-range-picker"

interface BookingSearchFormProps {
  hotel?: Hotel
  onSearch?: (searchParams: BookingSearchParams) => void
}

export interface BookingSearchParams {
  checkin: string
  checkout: string
  adults: number
  children: number
  childrenAges: number[]
}

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export function BookingSearchForm({ hotel, onSearch }: BookingSearchFormProps) {
  const router = useRouter()
  const [checkin, setCheckin] = useState("")
  const [checkout, setCheckout] = useState("")
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [childrenAges, setChildrenAges] = useState<number[]>([])
  const [selectedHotel, setSelectedHotel] = useState<string | null>(hotel?.id || null)
  const handleHotelChange = (value: string) => {
    setSelectedHotel(value)
    const selectedHotel = hotels.find((hotel: any) => hotel.id === value)
    setSelectedHotel(selectedHotel?.id || null)
  }
  const handleChildrenChange = (value: number) => {
    setChildren(value)
    if (value > childrenAges.length) {
      // Add new ages with default value 10
      const newAges = [...childrenAges]
      while (newAges.length < value) {
        newAges.push(10)
      }
      setChildrenAges(newAges)
    } else if (value < childrenAges.length) {
      // Remove extra ages
      setChildrenAges(childrenAges.slice(0, value))
    }
  }

  const handleChildrenAgeChange = (index: number, age: number) => {
    const newAges = [...childrenAges]
    newAges[index] = age
    setChildrenAges(newAges)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!checkin || !checkout) {
      alert("Lütfen giriş ve çıkış tarihlerini seçin")
      return
    }

    if (new Date(checkin) >= new Date(checkout)) {
      alert("Çıkış tarihi giriş tarihinden sonra olmalıdır")
      return
    }

    const searchParams: BookingSearchParams = {
      checkin,
      checkout,
      adults,
      children,
      childrenAges,
    }

    if (onSearch) {
      // If we have onSearch callback, use it (for price fetching)
      onSearch(searchParams)
    } else if (hotel) {
      // If we're on a hotel detail page without onSearch, navigate to booking page with params
      const params = new URLSearchParams({
        checkin,
        checkout,
        adults: adults.toString(),
        children: children.toString(),
        childrenAges: childrenAges.join(","),
      })
      router.push(`/otel/${hotel.slug}/rezervasyon?${params.toString()}`)
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2" />
          {hotel ? "Rezervasyon Telebi Oluştur" : "Otel Ara"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* {
            !hotel && (
              <div className="space-y-2">
                <Label htmlFor="hotel" className="flex items-center ">Otel Seçin</Label>
                <Select value={selectedHotel || ""} onValueChange={handleHotelChange}>
                  <SelectTrigger className="text-primary bg-white">
                    <SelectValue placeholder="Otel Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel: any) => (
                      <SelectItem key={hotel.id} value={hotel.id}>{hotel.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          } */}


          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center pl-2">
                {/* <Calendar className="w-4 h-4 mr-2" /> */}
                Tarih Aralığı
              </Label>

              <DateRangePicker
                onChange={({ from, to }) => {
                  if (!from || !to) return;

                  setCheckin(addDays(from, 1).toISOString().split("T")[0]);
                  setCheckout(addDays(to, 1).toISOString().split("T")[0]);
                }}
            />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adults" className="flex items-center pl-2">
                {/* <Users className="w-4 h-4 mr-2" /> */}
                Yetişkin Sayısı
              </Label>
              <Input
                id="adults"
                type="number"
                min="1"
                max="10"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="children" className="flex items-center pl-2">
                {/* <Users className="w-4 h-4 mr-2" /> */}
                Çocuk Sayısı
              </Label>
              <Input
                id="children"
                type="number"
                min="0"
                max="10"
                value={children}
                onChange={(e) => handleChildrenChange(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          {children > 0 && (
            <div className="space-y-2">
              <Label>Çocuk Yaşları</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {childrenAges.map((age, index) => (
                  <div key={index} className="space-y-1">
                    <Label className="text-xs">Çocuk {index + 1}</Label>
                    <Input
                      type="number"
                      min="0"
                      max="17"
                      value={age}
                      onChange={(e) =>
                        handleChildrenAgeChange(index, parseInt(e.target.value) || 0)
                      }
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            <Search className="w-4 h-4 mr-2" />
            {hotel && !onSearch ? "Fiyatı Gör ve Rezervasyon Yap" : hotel && onSearch ? "Fiyatı Gör" : "Ara"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

