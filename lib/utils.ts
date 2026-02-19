import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(value: number | string | null | undefined, currencyCode = 'TRY', locale = 'tr-TR'): string {
  if (value === null || value === undefined) return "0,00";

  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Geçersiz bir sayı gelirse 0 döndür
  if (isNaN(numericValue)) return "0,00";

  // Sadece sayıyı formatlamak istiyorsak (₺ simgesini siz dışarıdan ekleyecekseniz)
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

/* Eğer ₺ simgesini de bu fonksiyonun otomatik koymasını isterseniz şu şekilde kullanabilirsiniz:
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
*/