"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function HotelReviewPage({ hotel }: any) {
  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-0 p-0">

        {/* Left column */}
        <div className="
          flex flex-col justify-center items-center text-center gap-3
          bg-gray-100
          py-6 px-4
          md:py-8
          md:border-r
          md:rounded-l-xl
        ">
          <Avatar className="w-28 h-28 md:w-48 md:h-48 hover:scale-105 transition-all duration-500 border-4">
            <AvatarImage src="/sy.png" />
            <AvatarFallback>SY</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-bold text-lg md:text-xl">Sabahattin Yıldız</p>
            <p className="text-sm font-medium text-blue-700">
              Helal Tatil Uzmanı
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 flex flex-col gap-6 py-6 px-4 md:px-8 md:py-8">

          <div className="flex gap-8 items-center justify-between">
            <div className="flex flex-col gap-1">

              <CardTitle className="text-primary text-lg md:text-xl">
                Sabahattin Yıldız'ın Özel Yorumu
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Güncelleme tarihi: 01 Ocak 2026
              </p>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="hidden md:flex text-muted-foreground text-lg">
                <p>
                  {hotel.rating}
                </p>
              </div>
              <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    // i < Math.min(Math.floor(4.8), 5)
                    i < Math.min(Math.floor(hotel.rating), 5)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-400/70"
                    }`}
                />
              ))}
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed space-y-4">


            <div className="text-sm text-slate-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: hotel.SYReview }} />

            {/* 
            
          <p>
              The Oba Hotel, sunduğu ayrıcalıklı hizmet anlayışı ve misafir odaklı
              yaklaşımıyla öne çıkan seçkin bir konaklama deneyimi sunmaktadır.
              Otelin havalimanına olan yakın konumu, özellikle ulaşım kolaylığı
              arayan misafirler için önemli bir avantaj sağlamaktadır.
            </p>

            <p>
              Öğle ve akşam yemeklerinin à la carte olarak sunulması, hem kalite hem
              de sunum açısından fark yaratan bir detaydır. Yemek servislerinin son
              derece hızlı gerçekleştirilmesi ve servis ekibinin yüksek çalışma
              disiplini, güler yüzlü ve samimi yaklaşımlarıyla birleşerek misafir
              memnuniyetini üst seviyeye taşımaktadır.
            </p>

            <p>
              Bayanlara özel olarak ayrılmış plaj alanı, geniş yapısı ve ihtiyaçlara
              çözüm sunan donanımıyla konforlu ve huzurlu bir kullanım imkânı
              sağlamaktadır. Bodrum bölgesinin yüksek deniz suyu kalitesi, deniz
              keyfini daha da özel kılarken, çocuklar için tasarlanmış aquapark alanı
              ise aileler tarafından beğeniyle karşılanmaktadır.
            </p>

            <p>
              Genel olarak The Oba Hotel, güçlü hizmet altyapısı, nitelikli mutfağı
              ve güleryüzlü personeliyle hem aileler hem de konfor arayan misafirler
              için güvenle tercih edilebilecek bir otel profili çizmektedir.
            </p>
           */}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
