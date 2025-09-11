import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
} 