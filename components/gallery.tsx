"use client"

import React, { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Grid } from "lucide-react"
import { Hotel } from "@/lib/hotel-data"
import { useIsMobile } from "./hooks/use-mobile"

const IMAGE_COUNT = 12

const Gallery = ({ hotel }: { hotel: Hotel }) => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [open, setOpen] = useState(false)
  const touchStartX = useRef(0)
  const isMobile = useIsMobile()

  const prevImage = () => {
    setActiveIndex((p) => (p === 1 ? IMAGE_COUNT : p - 1))
  }

  const nextImage = () => {
    setActiveIndex((p) => (p === IMAGE_COUNT ? 1 : p + 1))
  }

  // Klavye desteği
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // if (open) {
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") setOpen(false)
      // }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 30) nextImage()
    if (diff < -30) prevImage()
  }

  // Thumbnail scroll ref
  const thumbnailRef = useRef<HTMLDivElement>(null)

  // Aktif thumbnail'i görünür yap
  useEffect(() => {
    if (thumbnailRef.current && open) {
      const activeThumb = thumbnailRef.current.children[activeIndex - 1] as HTMLElement
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [activeIndex, open])

  return (
    <div className={`w-full`}>
      {/* Desktop'ta maksimum genişlik */}
      <div className={`mx-auto w-full`}>

        {/* ANA GALERİ */}
        <div className={`${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 md:grid-cols-4 gap-4'} grid w-full`}>

          {/* Büyük görsel - Mobilde full width, Desktop'ta responsive */}
          <div className={`w-full relative ${isMobile ? 'col-span-1' : 'col-span-3'} sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg max-h-[50vh] flex`}>
            <div className="relative w-full overflow-hidden">
              <img
                src={`hotelImages/${hotel.imageSlug}_${activeIndex}.jpg`}
                alt={hotel.name}
                className="object-cover bg-center hover:scale-105 transition-transform duration-700 w-full"
                loading={activeIndex <= 2 ? "eager" : "lazy"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            </div>

            {/* Navigation Buttons */}
            <Button
              size={isMobile ? "sm" : "default"}
              variant="outline"
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg z-30"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <Button
              size={isMobile ? "sm" : "default"}
              variant="outline"
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg z-30"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Top Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-30">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setOpen(true)}
                className="bg-white/90 hover:bg-white shadow-md flex items-center gap-1"
              >
                <Grid className="h-4 w-4 text-black/90" />
                <span className="text-xs hidden sm:inline text-black/90">Galeri</span>
                <span className="text-xs font-semibold text-black/90">({IMAGE_COUNT})</span>
              </Button>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 z-30">
              {Array.from({ length: Math.min(IMAGE_COUNT, 8) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i + 1)}
                  className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${activeIndex === i + 1
                      ? 'bg-white w-6 md:w-8'
                      : 'bg-white/50 w-2 md:w-3 hover:bg-white/80'
                    }`}
                  aria-label={`Görsel ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Sağ küçükler - Sadece Desktop ve mobile expanded değilse */}
          {!isMobile && (
            <div className="grid grid-rows-2 gap-4 max-h-[50vh]">
              {[2, 3].map((i) => (
                <div key={i} className="relative group overflow-hidden rounded-xl shadow-md">
                  <img
                    src={`hotelImages/${hotel.imageSlug}_${i}.jpg`}
                    alt={hotel.name}
                    onClick={() => setActiveIndex(i)}
                    className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alt Thumbnails - Mobilde ve expanded durumunda */}
        {(!isMobile) && (
          <div className="mt-4 md:mt-6 flex items-center justify-center">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 p-1 scrollbar-hide" ref={thumbnailRef}>
              {Array.from({ length: IMAGE_COUNT }).map((_, i) => (
                <div key={i} className="relative group flex-shrink-0">
                  <img
                    src={`hotelImages/${hotel.imageSlug}_${i + 1}.jpg`}
                    alt={`${hotel.name} - ${i + 1}`}
                    onClick={() => setActiveIndex(i + 1)}
                    className={`h-16 md:h-20 w-24 md:w-32 cursor-pointer rounded-lg md:rounded-xl object-cover transition-all duration-300
                      ${activeIndex === i + 1
                        ? "ring-3 ring-primary shadow-lg scale-105"
                        : "opacity-80 hover:opacity-100 hover:scale-[1.02]"
                      }`}
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Bottom Thumbnails - Sadece mobil ve expanded değilse */}
        {isMobile && (
          <div className="mt-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {Array.from({ length: Math.min(IMAGE_COUNT, 6) }).map((_, i) => (
                <img
                  key={i}
                  src={`hotelImages/${hotel.imageSlug}_${i + 1}.jpg`}
                  alt={`${hotel.name} - ${i + 1}`}
                  onClick={() => setActiveIndex(i + 1)}
                  className={`h-12 w-16 cursor-pointer rounded-md object-cover flex-shrink-0
                    ${activeIndex === i + 1 ? "ring-2 ring-primary" : "opacity-70"}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* POPUP GALERİ DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className={`${isMobile ? 'w-full h-full m-0 max-w-none rounded-none' : 'max-w-6xl'} p-0 md:p-4 bg-black/95`}
          >
            {!isMobile && (
              <DialogTitle className="text-center text-white px-4 pt-4">
                {hotel.name} - Galeri
              </DialogTitle>
            )}

            <div className="relative flex justify-center items-center p-2 md:p-4">
              {/* Previous Button */}
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                onClick={prevImage}
                className={`absolute ${isMobile ? 'left-2' : 'left-4'} z-10 bg-white/20 hover:bg-white/40 border-white/30 text-white`}
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </Button>

              {/* Main Image */}
              <div
                className="flex justify-center items-center w-full"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={`hotelImages/${hotel.imageSlug}_${activeIndex}.jpg`}
                  alt={hotel.name}
                  className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[70vh]'} w-auto object-contain rounded-lg`}
                />
              </div>

              {/* Next Button */}
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                onClick={nextImage}
                className={`absolute ${isMobile ? 'right-2' : 'right-4'} z-10 bg-white/20 hover:bg-white/40 border-white/30 text-white`}
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </Button>

              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                {activeIndex} / {IMAGE_COUNT}
              </div>

              {/* Close Button - Mobile */}
              {/* {isMobile && (
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white border-white/30"
                >
                  Kapat
                </Button>
              )} */}
            </div>

            {/* Thumbnail Scroll */}
            <div className="px-2 md:px-4 pb-4">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                {Array.from({ length: IMAGE_COUNT }).map((_, i) => (
                  <div key={i} className="relative flex-shrink-0">
                    <img
                      src={`hotelImages/${hotel.imageSlug}_${i + 1}.jpg`}
                      onClick={() => setActiveIndex(i + 1)}
                      className={`h-16 md:h-20 w-24 md:w-32 cursor-pointer rounded-lg object-cover transition-all
                        ${activeIndex === i + 1
                          ? "ring-3 ring-white scale-105"
                          : "opacity-60 hover:opacity-100"
                        }`}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Gallery