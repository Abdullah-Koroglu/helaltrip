"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useTranslations } from "next-intl"

export default function HotelReviewPage({ hotel }: any) {
  const t = useTranslations("HotelReview")

  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-0 p-0">

        {/* Left column */}
        <div
          className="
          flex flex-col justify-center items-center text-center gap-3
          bg-gray-100
          py-6 px-4
          md:py-8
          md:border-r
          md:rounded-l-xl
        "
        >
          <Avatar className="w-28 h-28 md:w-48 md:h-48 hover:scale-105 transition-all duration-500 border-4">
            <AvatarImage src="/sy.png" />
            <AvatarFallback>SY</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-bold text-lg md:text-xl">
              {t("name")}
            </p>

            <p className="text-sm font-medium text-blue-700">
              {t("title")}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 flex flex-col gap-6 py-6 px-4 md:px-8 md:py-8">

          <div className="flex gap-8 items-center justify-between">
            <div className="flex flex-col gap-1">

              <CardTitle className="text-primary text-lg md:text-xl">
                {t("heading")}
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                {t("updateDate")}
              </p>

            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex text-muted-foreground text-lg">
                <p>{hotel.rating}</p>
              </div>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < Math.min(Math.floor(hotel.rating), 5)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="text-sm text-slate-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: hotel.SYReview }}
          />

        </div>
      </CardContent>
    </Card>
  )
}
