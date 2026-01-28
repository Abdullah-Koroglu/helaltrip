"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Hotel } from "@/lib/hotel-data"
import { hotels } from "@/lib/hotel-data"
import { DateRangePicker } from "./date-range-picker"
import { useTranslations } from "next-intl"
import { useLocalePath } from "./hooks/useLocalePath"

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
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function BookingSearchForm({ hotel, onSearch }: BookingSearchFormProps) {
  const t = useTranslations("BookingSearch")
  const { withLocale } = useLocalePath()


  const router = useRouter()
  const [checkin, setCheckin] = useState("")
  const [checkout, setCheckout] = useState("")
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [childrenAges, setChildrenAges] = useState<number[]>([])

  const handleChildrenChange = (value: number) => {
    setChildren(value)

    if (value > childrenAges.length) {
      const newAges = [...childrenAges]
      while (newAges.length < value) {
        newAges.push(10)
      }
      setChildrenAges(newAges)
    } else if (value < childrenAges.length) {
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
      alert(t("alerts.selectDates"))
      return
    }

    if (new Date(checkin) >= new Date(checkout)) {
      alert(t("alerts.invalidDate"))
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
      onSearch(searchParams)
    } else if (hotel) {
      const params = new URLSearchParams({
        checkin,
        checkout,
        adults: adults.toString(),
        children: children.toString(),
        childrenAges: childrenAges.join(","),
      })

      router.push(withLocale(`/otel/${hotel.slug}/rezervasyon?${params.toString()}`))
    }
  }

  return (
    <Card className="w-full">

      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2" />
          {hotel
            ? t("title.withHotel")
            : t("title.noHotel")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid md:grid-cols-3 gap-4">

            {/* Date */}
            <div className="space-y-2">
              <Label className="flex items-center pl-2">
                {t("fields.dateRange")}
              </Label>

              <DateRangePicker
                onChange={({ from, to }) => {
                  if (!from || !to) return

                  setCheckin(addDays(from, 1).toISOString().split("T")[0])
                  setCheckout(addDays(to, 1).toISOString().split("T")[0])
                }}
              />
            </div>

            {/* Adults */}
            <div className="space-y-2">
              <Label htmlFor="adults" className="flex items-center pl-2">
                {t("fields.adults")}
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

            {/* Children */}
            <div className="space-y-2">
              <Label htmlFor="children" className="flex items-center pl-2">
                {t("fields.children")}
              </Label>

              <Input
                id="children"
                type="number"
                min="0"
                max="10"
                value={children}
                onChange={(e) =>
                  handleChildrenChange(parseInt(e.target.value) || 0)
                }
                required
              />
            </div>

          </div>

          {/* Children Ages */}
          {children > 0 && (
            <div className="space-y-2">

              <Label>
                {t("fields.childrenAges")}
              </Label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {childrenAges.map((age, index) => (
                  <div key={index} className="space-y-1">

                    <Label className="text-xs">
                      {t("fields.child")} {index + 1}
                    </Label>

                    <Input
                      type="number"
                      min="0"
                      max="17"
                      value={age}
                      onChange={(e) =>
                        handleChildrenAgeChange(
                          index,
                          parseInt(e.target.value) || 0
                        )
                      }
                      required
                    />
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Search className="w-4 h-4 mr-2" />

            {hotel && !onSearch
              ? t("buttons.book")
              : hotel && onSearch
              ? t("buttons.seePrice")
              : t("buttons.search")}
          </Button>

        </form>
      </CardContent>

    </Card>
  )
}
