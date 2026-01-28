'use client'
import { useLocalePath } from '@/components/hooks/useLocalePath'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { hotels } from '@/lib/hotel-data'
import { MapPin, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const page = () => {
  const navt = useTranslations("nav")
  const t = useTranslations("common")
  const { withLocale } = useLocalePath()
  return (
    <>
      <div className="container mx-auto px-4 mt-12 pb-12">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">{navt('hotels')}</h1>
        <p className="text-xl text-center text-primary/70 mb-4">{t('bestHotels')}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {hotels.map((hotel: any) => (
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
                <p className="text-primary/70 text-sm mb-4 line-clamp-2">
                  {hotel.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {hotel.features.slice(0, 2).map((feature: any, index: any) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link href={withLocale(`/otel/${hotel.slug}`)}>
                    <Button size="sm" variant="outline">
                      {t('details')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default page