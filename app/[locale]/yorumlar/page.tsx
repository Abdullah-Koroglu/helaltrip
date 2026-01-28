"use client"

import review from "@/public/reviews.json"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

const Reviews = () => {
  const t = useTranslations("Reviews")

  return (
    <div className="container mx-auto px-4 mt-12">

      <Link
        target="_blank"
        href="https://www.google.com/search?sca_esv=21d142fe9e0fef6b&rlz=1C1ONGR_trTR1096TR1096&sxsrf=AE3TifONluydChVe4v0wnuLNa2o-0zgAVA:1756908875128&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-9P16DJLk8INtZhsUGN1m9MxbQDagele8zYIzSzro3plJ7kO0V7IwaY_9NFKnt0I9ecBo7KpVcf6w6-o61OY-9wNToKftlH2-hAfqs6CnMJURzruQ%3D%3D&q=Helaltrip+Turizm+Yorumlar&sa=X&ved=2ahUKEwijiJ7L47yPAxWnBtsEHR9oNeEQ0bkNegQIKBAE&biw=2048&bih=1044&dpr=1.25"
      >
        <p className="text-xl text-center text-blue-600 mb-8">
          {t("googleLink")}
        </p>
      </Link>

      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        {t("title")}
      </h1>

      <p className="text-xl text-center text-gray-600 mb-4">
        {t("summary", { count: review.length })}
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {review.map((review: any, index: number) => (
          <Card key={index} className="border-0 shadow-lg">

            <CardHeader>
              <div className="flex items-center justify-between">

                <div>
                  <CardTitle className="text-lg">
                    {review.name}
                  </CardTitle>

                  <CardDescription>
                    {review.platform}
                  </CardDescription>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating.split("/")[0]
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 italic">
                "{review.text}"
              </p>
            </CardContent>

          </Card>
        ))}
      </div>

    </div>
  )
}

export default Reviews
