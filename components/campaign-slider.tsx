"use client"

import { useState, useEffect } from "react"
import { campaigns } from "@/lib/campaign-data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Link from "next/link"

export function CampaignSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaigns.length)
    }, 12000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % campaigns.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + campaigns.length) % campaigns.length)
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {campaigns.map((campaign: any, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <img
            src={campaign.image}
            alt={campaign.header}
            className="w-full h-full object-cover"
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl text-white">
                
                <h1 className="text-5xl font-bold mb-4 max-w-xl">{campaign.header}</h1>
                <p className="text-xl mb-8 text-white line-clamp-2">
                  {campaign.description}
                </p>
                
                <div className="flex items-center space-x-4">
                  <Link target="blank" href={`${campaign.link}`}>
                    <Button size="lg" className="bg-green-600 hover:bg-green-600/90 duration-500 animate-attention hover:scale-110 transition-all">
                      {campaign.linkText}
                    </Button>
                  </Link>
                  {/* <Link href={`/otel/${hotel.slug}/rezervasyon`}>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Rezervasyon Yap
                    </Button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {campaigns.map((_ : any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
} 