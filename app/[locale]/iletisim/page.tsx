'use client'

import { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import Link from "next/link"
import { useTranslations } from "next-intl"


const Contact = () => {

  const t = useTranslations('Contact')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }


  const contactInfo = [
    {
      icon: Phone,
      title: t('info.phone.title'),
      details: ["+90 533 818 99 58"],
      href: "tel:+905338189958",
      description: t('info.phone.desc')
    },
    {
      icon: Mail,
      title: t('info.mail.title'),
      details: ["info@helaltrip.com"],
      href: "mailto:info@helaltrip.com",
      description: t('info.mail.desc')
    },
    {
      icon: MapPin,
      title: t('info.address.title'),
      details: [
        "Akşemsettin, Vatanperver Sk. Ata Apt No:2/1 34080 Fatih/İstanbul"
      ],
      href: "https://www.google.com/maps/place/Helaltrip+Turizm/",
      description: t('info.address.desc')
    },
    {
      icon: Instagram,
      title: t('info.instagram.title'),
      details: ["/helaltrip"],
      href: "https://www.instagram.com/helaltrip/",
      description: t('info.instagram.desc')
    }
  ]


  const officeHours = [
    {
      day: t('hours.week'),
      hours: "09:00 - 18:00"
    },
    {
      day: t('hours.sunday'),
      hours: "10:00 - 16:00"
    },
    {
      day: t('hours.holiday'),
      hours: t('hours.closed')
    }
  ]


  return (
    <div className="min-h-screen bg-background">


      {/* Hero */}
      <section
        className="hero-gradient text-white py-20"
        style={{ background: '#0f172a' }}
      >
        <div className="container mx-auto px-4 text-center">

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

        </div>
      </section>


      {/* Contact Info */}
      <section className="py-20 shadow-md">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

            {contactInfo.map((info, i) => {
              const Icon = info.icon

              return (
                <Link
                  target="_blank"
                  href={info.href}
                  key={i}
                  className="text-center group"
                >

                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {info.title}
                  </h3>

                  <div className="space-y-1 mb-3">
                    {info.details.map((d, idx) => (
                      <div key={idx} className="text-muted-foreground">
                        {d}
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-primary font-medium">
                    {info.description}
                  </p>

                </Link>
              )
            })}

          </div>
        </div>
      </section>


      {/* Form & Info */}
      <section className="py-20 bg-muted/30 shadow-md">

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">


            {/* Form */}
            <div>

              <h2 className="text-3xl font-bold mb-4">
                {t('form.title')}
              </h2>

              <p className="text-muted-foreground mb-8">
                {t('form.subtitle')}
              </p>


              <div className="space-y-6">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <Label>{t('form.name')}</Label>
                    <Input
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <Label>{t('form.email')}</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <Label>{t('form.phone')}</Label>
                    <Input
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>


                  <div>
                    <Label>{t('form.subject')}</Label>

                    <Select
                      value={formData.subject}
                      onValueChange={v => handleInputChange('subject', v)}
                    >

                      <SelectTrigger>
                        <SelectValue placeholder={t('form.subjectPlaceholder')} />
                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="reservation">
                          {t('form.subjects.reservation')}
                        </SelectItem>

                        <SelectItem value="information">
                          {t('form.subjects.information')}
                        </SelectItem>

                        <SelectItem value="complaint">
                          {t('form.subjects.complaint')}
                        </SelectItem>

                        <SelectItem value="suggestion">
                          {t('form.subjects.suggestion')}
                        </SelectItem>

                        <SelectItem value="other">
                          {t('form.subjects.other')}
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </div>

                </div>


                <div>
                  <Label>{t('form.message')}</Label>

                  <Textarea
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    placeholder={t('form.messagePlaceholder')}
                    rows={6}
                  />
                </div>


                {/* WhatsApp */}
                <a
                onClick={() => {
                  window.gtag("event", "conversion", {
                    send_to: "AW-123456789/AbCdEfGhIj",
                    event_callback: () => {
                      window.open("https://wa.me/905XXXXXXXXX", "_blank");
                    },
                  });
                }}                
                  href={`https://wa.me/905338189958?text=${encodeURIComponent(
                    `Ad Soyad: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}
Konu: ${formData.subject}
Mesaj: ${formData.message}`
                  )}`}
                  target="_blank"
                >

                  <Button size="lg" className="w-full mt-10">

                    <Send className="h-5 w-5 mr-2" />

                    {t('form.send')}

                  </Button>

                </a>

              </div>

            </div>


            {/* Office */}
            <div className="space-y-8">

              <div className="bg-card p-8 rounded-2xl">

                <div className="flex items-center gap-3 mb-6">

                  <Clock className="h-6 w-6 text-primary" />

                  <h3 className="text-2xl font-semibold">
                    {t('hours.title')}
                  </h3>

                </div>


                {officeHours.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between"
                  >
                    <span>{s.day}</span>
                    <span className="text-muted-foreground">
                      {s.hours}
                    </span>
                  </div>
                ))}


                <div className="mt-6 p-4 bg-accent/10 rounded-lg">

                  <p className="text-sm">

                    <strong>{t('hours.emergency')}</strong>

                    {t('hours.emergencyText')}

                  </p>

                </div>

              </div>


              {/* Map */}
              <div className="bg-card p-8 rounded-2xl">

                <h3 className="text-2xl font-semibold mb-6">
                  {t('map.title')}
                </h3>


                <div className="mt-4 text-sm text-muted-foreground">

                  <p>
                    <strong>{t('map.address')}:</strong>
                    {" "}
                    Akşemsettin, Vatanperver Sk. Ata Apt No:2/1
                  </p>

                  <p>
                    <strong>{t('map.city')}:</strong>
                    {" "}
                    34080 Fatih/İstanbul
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Contact
