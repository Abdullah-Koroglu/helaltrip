// app/otel/[slug]/page.tsx

import { notFound } from "next/navigation"
import { hotels } from "@/lib/hotel-data"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Gallery from "@/components/gallery"
import { HotelBookingSidebar } from "@/components/hotel-booking-sidebar"
import HotelStar from "@/components/star"
import HotelInfoCard from "@/components/hotelDetail"
import hotelDetails from "@/lib/hotel-details"
import HotelReviewPage from "./SYReview"

import Link from "next/link"
import { getTranslations } from "next-intl/server"

interface HotelPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return hotels.map(hotel => ({ slug: hotel.slug }))
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params

  const t = await getTranslations("Hotel")

  const hotel = hotels.find(h => h.slug === slug)

  if (!hotel) {
    notFound()
  }

  const data =
    hotelDetails[hotel.id as keyof typeof hotelDetails] ||
    hotelDetails["wome-deluxe"]

  return (
    <div className="min-h-screen bg-background text-primary">

      {/* Hero */}
      <div className="relative md:p-10 shadow-lg">
        <div className="flex">
          <Gallery hotel={hotel} />
        </div>

        <HotelStar hotel={hotel} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-primary">
        <div className="gap-8">

          {/* Sidebar */}
          <HotelBookingSidebar hotel={hotel} />

          <div className="space-y-6 p-0">

            {/* About */}
            {hotelDetails[hotel.id as keyof typeof hotelDetails] && (
              <Card className="p-0">
                <CardHeader>
                  <CardTitle className="text-primary">
                    {t("about")}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <HotelInfoCard data={data as any} />
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {hotel.SYReview && (
              <HotelReviewPage
                hotel={{
                  SYReview: hotel.SYReview,
                  rating: hotel.rating
                }}
              />
            )}

            {/* Map */}
            {hotel.mapLink && (
              <Card className="p-0">
                <CardHeader>
                  <CardTitle className="text-primary">
                    {t("map")}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0
                    }}
                  >
                    <iframe
                      src={hotel.mapLink}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0
                      }}
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">
                  {t("video")}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${hotel.youtubeVideoId}`}
                    title={`${hotel.name} ${t("videoTitle")}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Agency */}
            {hotel.agencyLink && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">
                    {t("agency")}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      href={hotel.agencyLink}
                      target="_blank"
                    >
                      {hotel.agencyLink}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
