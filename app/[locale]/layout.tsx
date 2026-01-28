import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {NextIntlClientProvider} from 'next-intl'

import Footer from '@/components/footer'
import {Header} from '@/components/header'
import ContactButton from '@/components/contact-button'
import TimedPopup from '@/components/TimedPopup'
import {defaultLocale, locales, type Locale} from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {

  const { locale } = await params

  const currentLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale

  const isEn = currentLocale === 'en'

  return {
    title: isEn
      ? "Helaltrip - Turkey's best halal alcohol-free family hotels"
      : "Helaltrip - Türkiye'nin en iyi helal konsept alkolsuz aile otelleri",

    description: isEn
      ? "The world's best halal alcohol-free family hotels are only in Turkey"
      : "Dünyanın en iyi helal konsept alkolsuz aile otelleri sadece Türkiye'de",

    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
    },
  }
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  
  const messages = (await import(`../../messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <div className="min-h-[calc(100vh-20rem)]">{children}</div>
      <TimedPopup />
      <ContactButton />
      <Footer />
    </NextIntlClientProvider>
  )
}

