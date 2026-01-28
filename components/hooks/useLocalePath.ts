'use client'

import { useParams, usePathname } from 'next/navigation'

export function useLocalePath() {
  const params = useParams()
  const pathname = usePathname()

  const locale = params?.locale as string

  function withLocale(path: string) {
    if (!locale) return path

    if (path.startsWith('/')) {
      return `/${locale}${path}`
    }

    return `/${locale}/${path}`
  }

  return { locale, withLocale, pathname }
}
