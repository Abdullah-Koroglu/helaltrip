# Helal Trip - Hotel Booking Website

Türkiye'nin en güzel otellerinde rezervasyon yapabileceğiniz modern ve kullanıcı dostu bir web sitesi.

## 🏨 Özellikler

- **11 Premium Otel**: Wome Deluxe, Angel's Marmaris, Adenya Resort ve daha fazlası
- **Modern Tasarım**: Minimal ve canlı renklerle responsive tasarım
- **Hero Slider**: Otellerin görselleriyle dinamik slider
- **Google Yorumları**: Müşteri deneyimleri ve puanları
- **Rezervasyon Sistemi**: Kolay ve güvenli rezervasyon yapma
- **PayTR Entegrasyonu**: Güvenli ödeme altyapısı
- **YouTube Videoları**: Her otel için tanıtım videoları
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🚀 Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI bileşenleri
- **Lucide React** - İkonlar
- **PayTR** - Ödeme sistemi

## 📦 Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 🔧 Yapılandırma

### PayTR Entegrasyonu

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_PAYTR_MERCHANT_ID=your_merchant_id
NEXT_PUBLIC_PAYTR_MERCHANT_KEY=your_merchant_key
NEXT_PUBLIC_PAYTR_MERCHANT_SALT=your_merchant_salt
```

### Otel Verileri

`lib/hotel-data.ts` dosyasında otel bilgilerini düzenleyebilirsiniz:

- Otel adı ve konumu
- Fiyat bilgileri
- YouTube video ID'leri
- Olanaklar ve özellikler

## 📁 Proje Yapısı

```
├── app/                    # Next.js app router
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   └── otel/              # Otel sayfaları
│       └── [slug]/
│           ├── page.tsx   # Otel detay sayfası
│           └── rezervasyon/
│               └── page.tsx # Rezervasyon sayfası
├── components/            # React bileşenleri
│   ├── ui/               # shadcn/ui bileşenleri
│   ├── header.tsx        # Header bileşeni
│   ├── hero-slider.tsx   # Hero slider
│   └── paytr-integration.tsx # PayTR entegrasyonu
├── lib/                  # Yardımcı fonksiyonlar
│   ├── utils.ts          # Utility fonksiyonları
│   └── hotel-data.ts     # Otel verileri
└── public/               # Statik dosyalar
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Primary**: Mavi (#2563eb)
- **Secondary**: Gri (#6b7280)
- **Accent**: Yeşil (#16a34a)
- **Background**: Açık gri (#f9fafb)

### Tipografi
- **Font**: Inter (Google Fonts)
- **Başlıklar**: Bold, büyük boyutlar
- **Metin**: Regular, okunabilir boyutlar

## 🔒 Güvenlik

- **SSL Şifreleme**: Tüm ödemeler 256-bit SSL ile korunur
- **PayTR Güvenliği**: PCI DSS uyumlu ödeme sistemi
- **Veri Koruma**: Kişisel bilgiler güvenle saklanır

## 📱 Responsive Tasarım

- **Mobil**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### Vercel (Önerilen)

1. GitHub'a projeyi push edin
2. Vercel'de yeni proje oluşturun
3. GitHub repository'sini bağlayın
4. Environment variables'ları ayarlayın
5. Deploy edin

### Diğer Platformlar

```bash
npm run build
npm start
```

## 📞 İletişim

- **Telefon**: +90 555 123 45 67
- **E-posta**: info@helaltrip.com
- **Adres**: Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Changelog

### v1.0.0
- İlk sürüm
- 11 otel eklendi
- Rezervasyon sistemi
- PayTR entegrasyonu
- Responsive tasarım 