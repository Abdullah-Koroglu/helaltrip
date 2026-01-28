// app/locamarin.tsx
import {  Hotel } from "@/lib/hotel-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Gallery from "@/components/gallery"
import HotelStar from "@/components/star"
import {getTranslations} from 'next-intl/server'


export default async function HotelPage() {
  const t = await getTranslations('locamarin')

  return (
    <div className="min-h-screen bg-background text-primary">
      <div className="relative md:p-10 shadow-lg">
        <div className="flex">
          <Gallery hotel={{ name: 'Loca Marin', imageSlug: 'loca' } as Hotel} />
        </div>
        <HotelStar hotel={{
          name: 'Locamarin',
          rating: 4.7,
          location: 'Muğla / Göcek'
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 text-primary">
        <div className="space-y-6">
          <Card className="p-0">
            <CardHeader>
              <CardTitle className="text-primary">
                <h2>{t("aboutTitle")}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <section className="">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {t("yachtVacationTitle")}
                  </h2>
                  <p className="mb-4">
                    {t("description1")}
                  </p>

                  <p className="mb-4">
                    {t("description2")}
                  </p>

                  <p>
                    {t("description3")}
                  </p>
                </div>

                {/* YAT 1 */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("yacht1.title")}
                  </h3>

                  <p>
                    {t("yacht1.description1")}
                  </p>

                  <p className="mt-2">
                    {t("yacht1.description2")}
                  </p>
                </div>

                {/* YAT 2 */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("yacht2.title")}
                  </h3>

                  <p>
                    {t("yacht2.description1")}
                  </p>

                  <p className="mt-2">
                    {t("yacht2.description2")}
                  </p>
                </div>

                {/* YAT 3 */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("yacht3.title")}
                  </h3>

                  <p>
                    {t("yacht3.description1")}
                  </p>

                  <p className="mt-2">
                    {t("yacht3.description2")}
                  </p>
                </div>

              </section>
            </CardContent>
          </Card>

          {/* Map Section */}
          <Card className="p-0">
            <CardHeader>
              <CardTitle className="text-primary">{t("mapTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4085.7803973264354!2d28.774008699999996!3d41.1207371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caaf131b8120ed%3A0x6a3c9870d1646839!2sLocamarin%20Yat!5e1!3m2!1str!2str!4v1768987951566!5m2!1str!2str"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>

          {/* YouTube Video */}
          <Card className="md:w-1/2 mx-auto">
            <CardHeader>
              <CardTitle className="text-primary">{t("videoTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src="https://www.instagram.com/reel/DTvfsM-iNw8/embed"
                title="Locamarin Tanıtım Videosu"
                className="w-full aspect-[9/16]"
                allowFullScreen
              />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}