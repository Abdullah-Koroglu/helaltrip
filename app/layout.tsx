import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'
import { Header } from '@/components/header'
import ContactButton from '@/components/contact-button'
import TimedPopup from '@/components/TimedPopup'
import { Poppins } from "next/font/google";

import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {

  const { locale } = await params



  return {
    title: "Helaltrip - Türkiye'nin en iyi helal konsept alkolsuz aile otelleri",

    description: "Dünyanın en iyi helal konsept alkolsuz aile otelleri sadece Türkiye'de",

    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
    },
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>        <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-10889372782"
        strategy="afterInteractive"
      />

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10889372782');
          `}
        </Script></head>
      <body className={poppins.className}>
        <div className="min-h-[calc(100vh-20rem)]">
          {children}
        </div>
      </body>
    </html>
  )
} 