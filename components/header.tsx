"use client"

import { useState } from "react"
import Link from "next/link"
import { hotels } from "@/lib/hotel-data"
import { Phone, Mail, Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center space-x-4">
            <Link
              target="_blank"
              className="flex items-center gap-2"
              href="https://wa.me/905338189958"
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
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-red-600">
            <Image
              src="logo.png"
              alt="Helaltrip"
              className="h-20 object-contain"
              height={80}
              width={250}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Ana Sayfa
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Oteller
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
                      href={`/otel/${hotel.slug}`}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
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
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {hotel.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {hotel.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/hakkimizda"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              İletişim
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
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
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <details>
                <summary className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
                  Oteller
                </summary>
                <div className=" mt-2 space-y-2 max-h-64 overflow-y-auto">
                  {hotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      href={`/otel/${hotel.slug}`}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                          width={40}
                          height={40}
                        />
                      </div>
                      <span className="text-sm text-gray-700">{hotel.name}</span>
                    </Link>
                  ))}
                </div>
              </details>
              <Link
                href="/hakkimizda"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                İletişim
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
