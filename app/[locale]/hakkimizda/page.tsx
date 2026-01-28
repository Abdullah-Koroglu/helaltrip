'use client'

import { Award, Users, MapPin, Heart, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLocalePath } from "@/components/hooks/useLocalePath"
import { useTranslations } from 'next-intl'

const About = () => {
  const { withLocale } = useLocalePath()
  const t = useTranslations('About')

  const stats = [
    { number: "10K+", label: t('stats.customers') },
    { number: "10+", label: t('stats.experience') },
    { number: "7/24", label: t('stats.support') }
  ]

  const values = [
    {
      icon: Heart,
      title: t('values.customer.title'),
      description: t('values.customer.desc')
    },
    {
      icon: Award,
      title: t('values.quality.title'),
      description: t('values.quality.desc')
    },
    {
      icon: CheckCircle,
      title: t('values.relationship.title'),
      description: t('values.relationship.desc')
    },
    {
      icon: Clock,
      title: t('values.support.title'),
      description: t('values.support.desc')
    }
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center text-white"
        style={{ background: '#0f172a' }}
      >
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            {t('hero.title')}
          </h1>

          <p className="text-lg text-white/90">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">

          <h2 className="text-4xl font-bold mb-6 text-center">
            {t('story.title')}
          </h2>

          <p className="leading-relaxed mb-12">
            {t('story.text')}
          </p>

          <h3 className="text-3xl font-bold mb-4">
            {t('vision.title')}
          </h3>

          <p className="mb-8 text-muted-foreground">
            {t('vision.text')}
          </p>

          <h3 className="text-3xl font-bold mb-4">
            {t('mission.title')}
          </h3>

          <p className="text-muted-foreground">
            {t('mission.text')}
          </p>

        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-6">
            {t('values.title')}
          </h2>

          <p className="text-center mb-16 text-muted-foreground">
            {t('values.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {values.map((value, i) => {
              const Icon = value.icon

              return (
                <div key={i} className="bg-card p-8 rounded-2xl">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    {value.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient text-white">

        <div className="container mx-auto px-4 text-center">

          <h2 className="text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>

          <p className="text-xl mb-8">
            {t('cta.subtitle')}
          </p>

          <div className="flex gap-4 justify-center">

            <Button variant="link">
              <Link
                href="https://wa.me/905338189958?text=Merhaba."
                className="text-white"
              >
                {t('cta.contact')}
              </Link>
            </Button>

            <Button variant="link">
              <Link
                href={withLocale('/oteller')}
                className="text-white"
              >
                {t('cta.hotels')}
              </Link>
            </Button>

          </div>

        </div>
      </section>

    </div>
  )
}

export default About
