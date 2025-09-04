"use client"
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Hotel } from '@/lib/hotel-data'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

const Gallery = ({ hotel }: { hotel: Hotel }) => {
  const [singleImage, setSingleImage] = useState(null)

  const handleSingleImage = (value: any) => {
    value ? setSingleImage(value) : setSingleImage(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Otel Resimleri</CardTitle>
      </CardHeader>
      <CardContent className="md:p-4 p-2">
        <Dialog
          open={!!singleImage}
          onOpenChange={handleSingleImage}
        >
          <DialogContent className="max-w-6xl p-2 md:p-4 py-8">
            <DialogTitle className="text-center">{hotel.name}</DialogTitle>
            <div className="w-full h-full flex justify-center items-center relative">
              <Button variant="outline" onClick={() => handleSingleImage(singleImage ? singleImage > 1 ? singleImage - 1 : 1 : 1)} className="absolute -left-1 top-1/2 transform -translate-y-1/2 z-30 md:w-12 md:h-12 w-8 h-8 md:p-0 p-2 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <img src={`/hotelImages/${hotel.imageSlug}_${singleImage}.jpg`} alt={hotel.name} className="w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] h-full object-cover  md:m-4 m-4 rounded-lg" />
              <Button variant="outline" onClick={() => handleSingleImage(singleImage ? singleImage < 12 ? singleImage + 1 : 1 : 1)} className="absolute -right-1 top-1/2 transform -translate-y-1/2 z-30 md:w-12 md:h-12 w-8 h-8 md:p-0 p-2 rounded-full">
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 py-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <img key={index} src={`/hotelImages/${hotel.imageSlug}_${index + 1}.jpg`} alt={hotel.name} className="w-full h-full object-cover cursor-pointer" onClick={() => handleSingleImage(index + 1)} />
          ))}
        </div>

      </CardContent>
    </Card>
  )
}

export default Gallery