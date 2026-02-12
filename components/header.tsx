"use client"

import { useState } from "react"
import Link from "next/link"
import { hotels } from "@/lib/hotel-data"
import { Phone, Mail, Menu, X } from "lucide-react"
import Image from "next/image"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { usePathname, useRouter } from "next/navigation"
import { useLocalePath } from "./hooks/useLocalePath"
import { useTranslations } from "next-intl"

export function Header() {
  const t = useTranslations('header')
  const navt = useTranslations('nav')

  const { withLocale } = useLocalePath()

  const [menuOpen, setMenuOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (lang: 'tr' | 'en') => {
    const segments = pathname.split('/')

    segments[1] = lang

    const newPath = segments.join('/')
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax;`

    router.push(newPath)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-primary/70 border-b">
          <div className="flex items-center space-x-4">
            <Link
              target="_blank"
              className="flex items-center gap-2"
              href="https://wa.me/905338189958"
              onClick={() => {
                window.gtag("event", "conversion", {
                  send_to: "AW-10889372782/7VMcCM7u7u4bEO7Iusgo",
                });
              }}
            >
              <Phone className="w-4 h-4" />
              +90 533 818 99 58
            </Link>
            <Link
              target="_blank"
              className="flex items-center gap-2"
              href="mailto:info@helaltrip.com"
            >
              <Mail className="w-4 h-4" />
              info@helaltrip.com
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-primary hidden md:block">
              {t('topBarSlogan')}
            </p>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <Link href={withLocale("/")} className="text-2xl font-bold text-red-600">
            <Image
              src="/logo.png"
              alt="Helaltrip"
              className="h-12 object-contain bg-red"
              height={80}
              width={200}
            />
            <p className="text-foreground font-thin text-[10px] w-full text-center h-5"
            >{navt('brandLicense')}</p>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={withLocale("/")}
              className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
            >
              {navt('home')}
            </Link>
            <div className="relative group">
              <button className="bg-white text-primary font-semibold hover:text-primary/80 transition-colors duration-300 flex items-center">
                {navt('hotels')}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4 grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                  {hotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      href={withLocale(`/otel/${hotel.slug}`)}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-primary/10 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-primary truncate">
                          {hotel.name}
                        </h4>
                        <p className="text-xs text-primary/70 truncate">
                          {hotel.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    key={'locamarin'}
                    href={withLocale(`locamarin`)}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-primary/10 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={'/hotelImages/loca_1.jpg'}
                        alt={"Locamarin"}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-primary truncate">
                        Locamarin
                      </h4>
                      <p className="text-xs text-primary/70 truncate">
                        Muğla / Göcek
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href={withLocale("/hakkimizda")}
              className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
            >
              {navt('about')}
            </Link>
            <Link
              href={withLocale("/iletisim")}
              className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
              >
              {navt('contact')}
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => changeLanguage("tr")}
                className="px-2 py-1 text-sm font-semibold border rounded hover:bg-primary/10"
              >
                TR
              </button>

              <button
                onClick={() => changeLanguage("en")}
                className="px-2 py-1 text-sm font-semibold border rounded hover:bg-primary/10"
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-primary font-semibold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white transition-all duration-300">
            <nav className="flex flex-col space-y-2 p-4">
              <Link
                href={withLocale("/")}
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <button className="w-full text-left text-primary font-semibold hover:text-primary/80 transition-colors duration-300 flex items-center justify-between">
                    <span>Oteller</span>
                    {/* simple chevron (rotates by default via CSS) */}
                    <svg
                      className="ml-2 h-4 w-4 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 8l4 4 4-4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </CollapsibleTrigger>


                <CollapsibleContent>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {hotels.map((hotel) => (
                      <Link
                        key={hotel.id}
                        href={withLocale(`/otel/${hotel.slug}`)}
                        className="flex items-center space-x-3 p-2 rounded hover:bg-primary/10 transition-colors duration-300"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" width={40} height={40} />
                        </div>
                        <span className="text-sm text-primary font-semibold">{hotel.name}</span>
                      </Link>
                    ))}
                    <Link
                      key={'locamarin'}
                      href={withLocale(`/locamarin`)}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-primary/10 transition-colors duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={'/hotelImages/loca_1.jpg'} alt={"Locamarin"} className="w-full h-full object-cover" width={40} height={40} />
                      </div>
                      <span className="text-sm text-primary font-semibold">Locamarin</span>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Link
                href={withLocale("/hakkimizda")}
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href={withLocale("/iletisim")}
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                İletişim
              </Link>

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => changeLanguage("tr")}
                  className="flex-1 py-2 border rounded text-sm font-semibold"
                >
                  Türkçe
                </button>

                <button
                  onClick={() => changeLanguage("en")}
                  className="flex-1 py-2 border rounded text-sm font-semibold"
                >
                  English
                </button>
              </div>

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
