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
  title: 'Helaltrip - Türkiye\'nin en iyi helal konsept alkolsuz aile otelleri',
  description: 'Dünyanın en iyi helal konsept alkolsuz aile otelleri sadece Türkiye\'de',
  icons: {
    icon: "./icon.png",
    shortcut: "./icon.png",
  },
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
        <div className="min-h-[calc(100vh-20rem)]">
          {children}
        </div>
        <TimedPopup />
        <ContactButton />
        <Footer />
      </body>
    </html>
  )
} 