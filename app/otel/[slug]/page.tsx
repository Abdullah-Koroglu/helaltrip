// app/otel/[slug]/page.tsx
import { notFound } from "next/navigation"
import { hotels, Hotel } from "@/lib/hotel-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Users, Heart, Home, Building } from "lucide-react"
import Gallery from "@/components/gallery"
import { HotelBookingSidebar } from "@/components/hotel-booking-sidebar"
import { fetchHotelDetails } from "@/lib/price-api"
import HotelStar from "@/components/star"
import HotelInfoCard from "@/components/hotelDetail"
import hotelDetails from "@/lib/hotel-details"
import HotelReviewPage from "./SYReview"


interface HotelPageProps {
  params: Promise<{ slug: string }>
}


export async function generateStaticParams() {
  return hotels.map(hotel => ({ slug: hotel.slug }))
}


export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params
  const hotel = hotels.find(h => h.slug === slug)
  
  const data = hotelDetails[hotel?.id as keyof typeof hotelDetails] || hotelDetails["wome-deluxe"]

  if (!hotel) {
    notFound()
  }

  // const { data: hotelDetails, error: hotelDetailsError } = await fetchHotelDetails(hotel.priceId) as { data: any | null, error: string | null }
  // if (hotelDetailsError) {
  //   console.error(hotelDetailsError)
  // }

  // console.log({ hotelDetails: hotelDetails?.data[0]?.facilities })

  return (
    <div className="min-h-screen bg-background text-primary">

      {/* Hero Banner */}
      <div className="relative md:p-10 shadow-lg">
        <div className="flex" >
          <Gallery hotel={hotel} />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" /> */}
        <HotelStar hotel={hotel} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-primary">
        <div className=" gap-8">
          {/* Main Content */}
          {/* <div className="lg:col-span-2 space-y-8">
            {/* Booking Sidebar */}
          {/* <HotelBookingSidebar hotel={hotel} /> */}


          <div className="space-y-6 p-0">
            {hotelDetails[hotel?.id as keyof typeof hotelDetails] &&
              <Card className="p-0">
                <CardHeader>
                  <CardTitle className="text-primary">Otel Hakkında</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <HotelInfoCard data={data as any} />
                </CardContent>
              </Card>
            }

            {hotel.SYReview && <HotelReviewPage hotel={{
              SYReview: hotel.SYReview,
              rating: hotel.rating
            }}/>}

            {

              hotel.mapLink &&
              <Card className="p-0">
                <CardHeader>
                  <CardTitle className="text-primary">Harita</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={hotel.mapLink}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>

                </CardContent>
              </Card>
            }

            {/* YouTube Video */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Otel Tanıtım Videosu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${hotel.youtubeVideoId}`}
                    title={`${hotel.name} Tanıtım Videosu`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-primary">Özellikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {hotel.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>

        </div>
      </div>
    </div>
  )
}