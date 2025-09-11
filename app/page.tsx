import { HeroSlider } from "@/components/hero-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { hotels } from "@/lib/hotel-data"
import { Star, Shield, MapPin, Heart, Users, Award } from "lucide-react"
import Link from "next/link"
const review = require("@/public/reviews.json")

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Türkiye'nin en güzel otellerinde unutulmaz deneyimler yaşayın
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Premium Kalite</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sadece en kaliteli otelleri seçiyoruz
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Müşteri Memnuniyeti</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  %100 müşteri memnuniyet oranı
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Eşsiz Lokasyonlar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Türkiye'nin en güzel yerlerinde
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-center flex-col">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Müşteri Yorumları
            </h2>
            <p className="text-xl text-gray-600">
              Google'da 5/5 puan ortalaması
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {review.slice(0, 6).map((review : any, index : any) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.platform}</CardDescription>
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
                  <p className="text-gray-600 italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Link className="mt-12 mx-auto" href="/yorumlar">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 mt-12 mx-auto">
              Tüm Yorumları Gör
            </Button>
          </Link>

        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popüler Otellerimiz
            </h2>
            <p className="text-xl text-gray-600">
              En çok tercih edilen otellerimizi keşfedin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.slice(0, 6).map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-medium">
                    ₺{hotel.price.toLocaleString()}
                  </div> */}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{hotel.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{hotel.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {hotel.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Link href={`/otel/${hotel.slug}`}>
                      <Button size="sm" variant="outline">
                        Detaylar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/oteller">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Tüm Otelleri Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
} 