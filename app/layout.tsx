import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'
import { Header } from '@/components/header'
import ContactButton from '@/components/contact-button'
import TimedPopup from '@/components/TimedPopup'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Helaltrip - Türkiye\'nin En Güzel Otelleri',
  description: 'Türkiye\'nin en güzel otellerinde unutulmaz deneyimler yaşayın. Premium kalite, müşteri memnuniyeti ve eşsiz lokasyonlar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={poppins.className}>
        <Header />

        {children}
        <ContactButton />
        <Footer />
        <TimedPopup />
      </body>
    </html>
  )
} 