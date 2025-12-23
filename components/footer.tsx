import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Image src="logo-w.png" alt="Helaltrip" width={240} height={32} />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Türkiye'nin en güzel otellerinde unutulmaz tatil deneyimleri sunan güvenilir turizm acenteniz.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-secondary cursor-pointer smooth-transition" />
              <Instagram className="h-5 w-5 hover:text-secondary cursor-pointer smooth-transition" />
              <Twitter className="h-5 w-5 hover:text-secondary cursor-pointer smooth-transition" />
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hızlı Linkler</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm hover:text-secondary smooth-transition">
                Ana Sayfa
              </Link>
              <Link href="/oteller" className="block text-sm hover:text-secondary smooth-transition">
                Oteller
              </Link>
              <Link href="/hakkimizda" className="block text-sm hover:text-secondary smooth-transition">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="block text-sm hover:text-secondary smooth-transition">
                İletişim
              </Link>
            </div>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hizmetlerimiz</h3>
            <div className="space-y-2 text-sm">
              <div>Premium Kalite</div>
              <div>Müşteri Memnuniyeti</div>
              <div>Eşsiz Lokasyonlar</div>
              <div>7/24 Destek</div>
            </div>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span className="text-sm">+90 533 818 99 58</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-sm">info@helaltrip.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                <span className="text-sm">Akşemsettin, Vatanperver Sk. Ata Apt No:2/1 34080 Fatih/İstanbul</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/80">
              © 2024 Helaltrip. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 text-sm">
              
              {/* tursab belgesi */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;