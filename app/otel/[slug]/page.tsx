// app/otel/[slug]/page.tsx
import { notFound } from "next/navigation"
import { hotels, Hotel } from "@/lib/hotel-data"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Users, Heart, Phone, Mail, Home, Building } from "lucide-react"
import Link from "next/link"

interface HotelPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return hotels.map(hotel => ({ slug: hotel.slug }))
}


export default function HotelPage({ params }: HotelPageProps) {
  const hotel: Hotel | undefined = hotels.find(h => h.slug === params.slug)

  if (!hotel) {
    notFound()
  }

  const amenityIcons: { [key: string]: any } = {
    "Ücretsiz WiFi": Wifi,
    "Havuz": Car,
    "Spa": Car,
    "Restoran": Utensils,
    "Bar": Utensils,
    "Gym": Dumbbell,
    "Su Sporları": Car,
    "Rüzgar Sörfü": Car,
    "Plaj Bar": Utensils,
    "Çocuk Havuzu": Car,
    "Animasyon": Users,
    "Deniz Manzarası": MapPin,
    "Özel Plaj": Car,
    "Çocuk Kulübü": Users,
    "Mini Golf": Dumbbell,
    "Tenis Kortu": Dumbbell,
    "Aile Havuzu": Car,
    "Dağ Manzarası": MapPin,
    "Doğa Yürüyüşü": MapPin,
    "Tarihi Manzara": MapPin,
    "Antik Kent Turu": MapPin,
    "Özel Villa": Home,
    "Infinity Havuz": Car,
    "Spa Merkezi": Car,
    "Golf Sahası": Dumbbell,
    "Helikopter Transfer": Car,
    "Yat Limanı": Car,
    "Lüks Restoran": Utensils,
    "Merkezi Konum": MapPin,
    "İş Merkezi": Building,
    "Toplantı Salonu": Building,
    "Tatil Köyü": Home,
    "Çoklu Havuz": Car,
    "Spor Alanları": Dumbbell,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl text-white">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(hotel.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-medium">{hotel.rating}</span>
              </div>

              <h1 className="text-6xl font-bold mb-4">{hotel.name}</h1>
              <p className="text-2xl mb-6 text-gray-200 flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                {hotel.location}
              </p>

              {/* <div className="flex items-center space-x-4">
                <Link href={`/otel/${hotel.slug}/rezervasyon`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Rezervasyon Yap
                  </Button>
                </Link>
                <div className="text-2xl font-bold">
                  ₺{hotel.price.toLocaleString()}
                  <span className="text-lg font-normal"> / gece</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Otel Hakkında</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {hotel.description}
                </p>
              </CardContent>
            </Card>

            {/* YouTube Video */}
            <Card>
              <CardHeader>
                <CardTitle>Otel Tanıtım Videosu</CardTitle>
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
            <Card>
              <CardHeader>
                <CardTitle>Özellikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {hotel.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Otel Olanakları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hotel.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || MapPin
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}