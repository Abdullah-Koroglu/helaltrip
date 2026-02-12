"use client";

import { useState, useEffect } from "react";
import { campaigns } from "@/lib/campaign-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CampaignSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const t = useTranslations("Campaigns");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaigns.length);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % campaigns.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + campaigns.length) % campaigns.length
    );
  };

  return (
    <div className="relative h-[600px] overflow-hidden">

      {/* Slides */}
      {campaigns.map((campaign, index) => (
        <div
          key={campaign.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />

          <img
            src={campaign.image}
            alt={t(`${campaign.id}.header`)}
            className="w-full h-full object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl text-white">

                <h1 className="text-5xl md:text-[4rem] font-bold mb-4 max-w-3xl leading-tight">
                  {t(`${campaign.id}.header`)}
                </h1>

                <p className="text-xl mb-8 text-white line-clamp-2">
                  {t(`${campaign.id}.description`)}
                </p>

                <div className="flex items-center space-x-4">
                  <Link target="_blank" href={campaign.link}>
                    <Button
                      onClick={() => {
                        window.gtag("event", "conversion", {
                          send_to: "AW-10889372782/7VMcCM7u7u4bEO7Iusgo",
                        });
                      }}
                      size="lg"
                      className="bg-green-600 hover:bg-green-600/90 duration-500 animate-attention hover:scale-110 transition-all"
                    >
                      {t(`${campaign.id}.linkText`)}
                    </Button>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {campaigns.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
          />
        ))}
      </div>

    </div>
  );
}
