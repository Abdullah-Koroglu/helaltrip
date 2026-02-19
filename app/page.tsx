// app/page.tsx
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function Page() {
  // Tarayıcıdan gelen istek başlıklarını (headers) alıyoruz
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  const supportedLocales = ["tr", "en", "de"];
  let targetLocale = "en"; // Varsayılan (fallback) dilimiz

  if (acceptLanguage) {
    // Accept-Language genelde şu formattadır: "tr-TR,tr;q=0.9,en-US;q=0.8,de;q=0.7"
    // Bu string'i parçalayarak kullanıcının tercih ettiği dillerin ilk 2 harfini (tr, en, de vb.) çıkarıyoruz.
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().substring(0, 2).toLowerCase());

    // Kullanıcının tercih sırasına göre, bizim desteklediğimiz dillerden ilk eşleşeni buluyoruz
    const matchedLocale = preferredLanguages.find((lang) =>
      supportedLocales.includes(lang)
    );

    // Eğer desteklediğimiz bir dil eşleştiyse, hedef dilimizi güncelliyoruz
    if (matchedLocale) {
      targetLocale = matchedLocale;
    }
  }

  // Tarayıcı dili eşleştiyse o dile, eşleşmediyse/bulunamadıysa 'en' diline yönlendiriyoruz
  redirect(`/${targetLocale}`);
}