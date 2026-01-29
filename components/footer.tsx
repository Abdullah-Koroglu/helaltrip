'use client'

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useLocalePath } from "./hooks/useLocalePath";
import { useTranslations } from "next-intl";

const Footer = () => {
  const { withLocale } = useLocalePath()
  const t = useTranslations('footer')
  const navt = useTranslations('nav')
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Image src="/logo-w.png" alt="Helaltrip" width={240} height={32} />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('companyBlurb')}
            </p>
            <div className="flex space-x-4">
              {/* <Whatsapp className="h-5 w-5 hover:text-secondary cursor-pointer smooth-transition" /> */}
              <Link href={'https://www.instagram.com/helaltrip/'}><Instagram className="h-5 w-5 hover:text-secondary cursor-pointer smooth-transition" /></Link>
              <Link
              onClick={() => {
                window.gtag("event", "conversion", {
                  send_to: "AW-123456789/AbCdEfGhIj",
                  event_callback: () => {
                    window.open("https://wa.me/905XXXXXXXXX", "_blank");
                  },
                });
              }}              
              href={"https://wa.me/905338189958"}><MessageCircle className="h-5 w-5 hover:text-secondary cursor-pointer smooth-transition" /></Link>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('quickLinks')}</h3>
            <div className="space-y-2">
              <Link href={withLocale("/")} className="block text-sm hover:text-secondary smooth-transition">
                {navt('home')}
              </Link>
              <Link href={withLocale("/oteller")} className="block text-sm hover:text-secondary smooth-transition">
                {navt('hotels')}
              </Link>
              <Link href={withLocale("/hakkimizda")} className="block text-sm hover:text-secondary smooth-transition">
                {navt('about')}
              </Link>
              <Link href={withLocale("/iletisim")} className="block text-sm hover:text-secondary smooth-transition">
                {navt('contact')}
              </Link>
            </div>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('services')}</h3>
            <div className="space-y-2 text-sm">
              <div>{t('service1')}</div>
              <div>{t('service2')}</div>
              <div>{t('service3')}</div>
              <div>{t('service4')}</div>
            </div>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{navt('contact')}</h3>
            <div className="space-y-3">
              <Link href={"tel:+905338189958"} className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span className="text-sm">+90 533 818 99 58</span>
              </Link>
              <Link href={"mailto:info@helaltrip.com"} className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-sm">info@helaltrip.com</span>
              </Link>
              <Link href={'https://www.google.com/maps/place/Helaltrip+Turizm/@41.0165089,28.9474909,940m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cabb1c9d0f1d73:0x456c3da49b531acc!8m2!3d41.0165089!4d28.9474909!16s%2Fg%2F11ryh0nyyj?entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D'} className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                <span className="text-sm">Akşemsettin, Vatanperver Sk. Ata Apt No:2/1 34080 Fatih/İstanbul</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm">

              <Link href={withLocale("/tursab")} className="flex items-center gap-3">
                <Image
                  src="/tursab.jpg"
                  alt="TÜRSAB Turizm Seyahat Acentası Belgesi"
                  width={50}
                  height={50}
                  className="rounded"
                />
                <p className="text-xs text-primary-foreground/80 leading-snug">
                  {t('tursabTextLine1')}
                  <br />
                  {t('tursabTextLine2')}: <strong>13707</strong>
                </p>
              </Link>

            </div>
            <p className="text-sm text-primary-foreground/80">
              © 2025 Helaltrip. {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;