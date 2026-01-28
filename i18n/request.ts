import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
import { defaultLocale } from '@/i18n';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  
  // next-intl varsayılan olarak NEXT_LOCALE cookie'sini kullanır
  const locale = cookieStore.get('NEXT_LOCALE')?.value || defaultLocale;
  
  console.log('Detected locale from cookies:', locale); // "tr" olmalı
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});