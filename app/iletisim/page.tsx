"use client"
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      // toast({
      //   title: "Eksik Bilgi",
      //   description: "Lütfen tüm gerekli alanları doldurun.",
      //   variant: "destructive"
      // });
      return;
    }

    // Simulate form submission
    // toast({
    //   title: "Mesaj Gönderildi!",
    //   description: "En kısa sürede size geri döneceğiz.",
    // });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      details: ["+90 533 818 99 58"],
      href: "tel:+905338189958",
      description: "7/24 müşteri hizmetleri"
    },
    {
      icon: Mail,
      title: "E-posta",
      details: ["info@helaltrip.com"],
      href: 'mailto:info@helaltrip.com',
      description: "24 saat içinde yanıt"
    },
    {
      icon: MapPin,
      title: "Adres",
      details: ["Akşemsettin, Vatanperver Sk. Ata Apt No:2/1 34080 Fatih/İstanbul"],
      href: 'https://www.google.com/maps/place/Helaltrip+Turizm/@41.0165089,28.9474909,940m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cabb1c9d0f1d73:0x456c3da49b531acc!8m2!3d41.0165089!4d28.9474909!16s%2Fg%2F11ryh0nyyj?entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D',
      description: "Merkez ofisimiz"
    },
    {
      icon: Instagram,
      title: "Instagram",
      details: ["/helaltrip"],
      href: 'https://www.instagram.com/helaltrip/',
      description: "7/24 müşteri hizmetleri"
    }
  ];

  const officeHours = [
    { day: "Pazartesi - Cumartesi", hours: "09:00 - 18:00" },
    { day: "Pazar", hours: "10:00 - 16:00" },
    { day: "Resmi Tatiller", hours: "Kapalı" }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20" style={{ background: '#0f172a' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">İletişim</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Sorularınız, önerileriniz veya rezervasyon talepleriniz için bizimle iletişime geçin
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Link target="_blank" href={info.href} key={index} className="text-center group">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 smooth-transition">
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <div key={idx} className="text-muted-foreground">{detail}</div>
                    ))}
                  </div>
                  <p className="text-sm text-primary font-medium">{info.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted/30 shadow-md rounded-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Bize WhatsApp Üzerinden Ulaşın</h2>
                <p className="text-muted-foreground">
                  Sorularınızı ve taleplerinizi WhatsApp üzerinden hızlıca iletebilirsiniz.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      className="text-primary bg-white"
                      id="name"
                      value={formData.name}
                      onChange={(e: any) => handleInputChange('name', e.target.value)}
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      className="text-primary bg-white"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: any) => handleInputChange('email', e.target.value)}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      className="text-primary bg-white"
                      id="phone"
                      value={formData.phone}
                      onChange={(e: any) => handleInputChange('phone', e.target.value)}
                      placeholder="+90 5xx xxx xx xx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value: any) => handleInputChange('subject', value)}
                    >
                      <SelectTrigger className="text-primary bg-white">
                        <SelectValue placeholder="Konu seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reservation">Rezervasyon</SelectItem>
                        <SelectItem value="information">Bilgi Talebi</SelectItem>
                        <SelectItem value="complaint">Şikayet</SelectItem>
                        <SelectItem value="suggestion">Öneri</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mesaj *</Label>
                  <Textarea
                    className="text-primary bg-white"
                    id="message"
                    value={formData.message}
                    onChange={(e: any) => handleInputChange('message', e.target.value)}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={6}
                    required
                  />
                </div>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/905338189958?text=${encodeURIComponent(
                    `Ad Soyad: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}
Konu: ${formData.subject}
Mesaj: ${formData.message}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" size="lg" className="w-full mt-10">
                    <Send className="h-5 w-5 mr-2" />
                    WhatsApp ile Gönder
                  </Button>
                </a>
              </div>
            </div>


            {/* Additional Info */}
            <div className="space-y-8">

              {/* FAQ */}
              {/* <div className="bg-card p-8 rounded-2xl card-shadow ">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-semibold">Sık Sorulan Sorular</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <h4 className="font-medium mb-2">Rezervasyon iptali nasıl yapılır?</h4>
                    <p className="text-sm text-muted-foreground">
                      Rezervasyonunuzu 48 saat öncesine kadar ücretsiz iptal edebilirsiniz.
                    </p>
                  </div>
                  
                  <div className="border-b border-border pb-4">
                    <h4 className="font-medium mb-2">Ödeme seçenekleri nelerdir?</h4>
                    <p className="text-sm text-muted-foreground">
                      Kredi kartı, banka havalesi ve kapıda ödeme seçenekleri mevcuttur.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Grup rezervasyonu indirimi var mı?</h4>
                    <p className="text-sm text-muted-foreground">
                      10 kişi ve üzeri gruplar için özel indirimler sunuyoruz.
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Office Hours */}
              <div className="bg-card p-8 rounded-2xl card-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-semibold">Çalışma Saatlerimiz</h3>
                </div>

                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent-foreground">
                    <strong>Acil Durumlar:</strong> 7/24 destek hattımız +90 533 888 99 99 numarasından ulaşılabilir.
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card p-8 rounded-2xl card-shadow">
                <h3 className="text-2xl font-semibold mb-6">Ofisimizi Ziyaret Edin</h3>
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    className="w-full h-full rounded-xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4092.2621955271507!2d28.9474909!3d41.016508900000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb1c9d0f1d73%3A0x456c3da49b531acc!2sHelaltrip%20Turizm!5e1!3m2!1str!2str!4v1767880098329!5m2!1str!2str"></iframe>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p><strong>Adres:</strong> Akşemsettin, Vatanperver Sk. Ata Apt No:2/1</p>
                  <p><strong>Şehir:</strong> 34080 Fatih/İstanbul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;