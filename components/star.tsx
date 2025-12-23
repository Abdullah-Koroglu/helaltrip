import { MapPin, Star } from 'lucide-react'
import React from 'react'

interface HotelStarProps {
  hotel: {
    rating: number
    name: string
    location: string
    price?: number
  }
}

const HotelStar = ({ hotel }: HotelStarProps) => {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 flex items-center md:block">
        <div className="max-w-4xl text-white mx-auto md:mx-0">
          {/* Rating - Mobile: compact, Desktop: larger */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 lg:mb-4">
            <div className="flex items-center">
              {/* Mobile stars (3 stars) */}
              <div className="flex md:hidden">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < Math.min(Math.floor(hotel.rating), 3)
                        ? "text-yellow-400 fill-current"
                        : "text-white/70"
                    }`}
                  />
                ))}
              </div>
              {/* Desktop stars (5 stars) */}
              <div className="hidden md:flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 lg:w-5 lg:h-6 ${
                      i < Math.floor(hotel.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm sm:text-base lg:text-xl font-medium">
              {hotel.rating.toFixed(1)}
            </span>
          </div>

          {/* Hotel Name - Responsive with different sizes */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">
            {hotel.name}
          </h1>

          {/* Location with icon - Truncate on mobile */}
          <div className="flex items-center mb-4 sm:mb-5 lg:mb-6">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-6 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base xl:text-lg truncate md:whitespace-normal">
              {hotel.location}
            </span>
          </div>

          {/* Mobile-only quick info card */}
          {/* <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm text-white/80">Ortalama Fiyat</div>
                <div className="font-bold text-base sm:text-lg">
                  {hotel.price ? `₺${hotel.price.toLocaleString()}` : 'Fiyat bilgisi'}
                  <span className="text-xs sm:text-sm font-normal"> / gece</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap">
                Hemen İncele
              </button>
            </div>
          </div> */}

          {/* Desktop-only actions */}
          {/* <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base transition-colors">
              Rezervasyon Yap
            </button>
            {hotel.price && (
              <div className="text-lg lg:text-2xl font-bold">
                ₺{hotel.price.toLocaleString()}
                <span className="text-sm lg:text-lg font-normal ml-1">/ gece</span>
              </div>
            )}
          </div> */}

          {/* Mobile gradient overlay */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default HotelStar