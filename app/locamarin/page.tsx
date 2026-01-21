// app/locamarin.tsx
import {  Hotel } from "@/lib/hotel-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Gallery from "@/components/gallery"
import HotelStar from "@/components/star"


export default async function HotelPage() {

  return (
    <div className="min-h-screen bg-background text-primary">

      <div className="relative md:p-10 shadow-lg">
        <div className="flex" >
          <Gallery hotel={{ name: 'Loca Marin', imageSlug: 'loca' } as Hotel} />
        </div>
        <HotelStar hotel={{
          name: 'Loca Marin',
          rating: 4.7,
          location: 'Muğla / Göcek'
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 text-primary">
        <div className=" gap-8">

          <div className="space-y-6 p-0">
            <Card className="p-0">
              <CardHeader>
                <CardTitle className="text-primary"><h2>
                  Locamarin Hakkında
                </h2></CardTitle>
              </CardHeader>
              <CardContent className="">
                <section className="">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Locamarin Yat Tatili
                    </h2>
                    <p className="mb-4">
                      Locamarin Yat Tatili, deniz üzerinde konforlu, mahrem ve tamamen size
                      özel bir tatil deneyimi sunar. Göcek’in eşsiz koylarında gerçekleştirilen
                      bu özel konsept, klasik otel tatiline alternatif olarak özgürlük ve
                      huzuru bir araya getirir. Tatil boyunca teknede yalnızca sizin
                      belirlediğiniz misafirler bulunur; tüm detaylar konfor, mahremiyet ve
                      ayrıcalık esas alınarak hazırlanır.
                    </p>

                    <p className="mb-4">
                      Locamarin filosunda yer alan katamaran ve gulet tekneler; ev konforunda
                      yaşam alanları, klimalı ve özel banyolu kamaraları, geniş güverte
                      alanları ve dinlenme köşeleriyle denizin üzerinde lüks bir yaşam sunar.
                      Alkolsüz hizmet anlayışıyla sunulan bu tatilde; internet, kitaplık,
                      kutu oyunları, SUP, kano ve deniz ekipmanları gibi birçok aktivite
                      imkânı bulunmaktadır.
                    </p>

                    <p>
                      Aileler ve arkadaş grupları için ideal olan Locamarin Yat Tatili,
                      tamamen size ait, güvenli ve sakin bir atmosferde denizle iç içe bir
                      tatil yaşamak isteyenler için tasarlanmıştır.
                    </p>
                  </div>

                  {/* YAT 1 */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Loca Comfort – Katamaran
                    </h3>

                    <p>
                      19 metre uzunluğundaki Loca Comfort katamaran, ev konforunda yat tatili
                      arayan misafirler için özel olarak tasarlanmıştır. 3 kamarasıyla
                      toplamda 8 kişiye kadar konaklama imkânı sunan teknede, her odada çift
                      kişilik yatak, klima, duş ve WC bulunmaktadır. Boydan boya camlara
                      sahip kamaralar sayesinde denizle iç içe, ferah bir yaşam alanı
                      sunulur.
                    </p>

                    <p className="mt-2">
                      Geniş güverte alanları, korunaklı güneşlenme alanı ve üst katta yer alan
                      mini mutfak ile misafirler gün boyunca konforlu vakit geçirebilir.
                      Tamamen kadın mürettebat (kaptan, aşçı ve gemi görevlisi) tarafından
                      hizmet verilen teknede alkolsüz konsept uygulanmaktadır.
                    </p>
                  </div>

                  {/* YAT 2 */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Loca İstanbul – Gulet
                    </h3>

                    <p>
                      22 metre uzunluğundaki Loca İstanbul Gulet, geniş yaşam alanları ve
                      yüksek konfor seviyesiyle kalabalık aileler ve arkadaş grupları için
                      idealdir. 4 kamarasıyla 8 kişiye kadar konaklama sunan teknede, tüm
                      odalarda çift kişilik yatak, klima, duş ve WC bulunmaktadır.
                    </p>

                    <p className="mt-2">
                      Geniş güverte alanları, konforlu dinlenme köşeleri ve profesyonel
                      mürettebat (kaptan, aşçı ve gemi görevlisi) eşliğinde sunulan hizmetle,
                      misafirler tamamen kendilerine ait bir ortamda tatilin keyfini
                      çıkarır. Alkolsüz hizmet anlayışıyla güvenli ve huzurlu bir tatil
                      deneyimi sunar.
                    </p>
                  </div>

                  {/* YAT 3 */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Loca Venn – Gulet
                    </h3>

                    <p>
                      17 metre uzunluğundaki Loca Venn Gulet, daha butik ve sakin bir yat
                      tatili arayan misafirler için tasarlanmıştır. 2 kamarasıyla 4 kişilik
                      konaklama imkânı sunan teknede, her odada çift kişilik yatak ve klima
                      bulunmaktadır.
                    </p>

                    <p className="mt-2">
                      Güneşlenme alanları, rahat dinlenme köşeleri ve kaptan ile aşçıdan
                      oluşan mürettebat eşliğinde hizmet verilen Loca Venn, küçük gruplar ve
                      çekirdek aileler için ideal bir seçenektir. Alkolsüz konsepti ve
                      sunduğu etkinlik imkânlarıyla huzurlu bir deniz tatili sunar.
                    </p>
                  </div>

                </section>
              </CardContent>
            </Card>

            {/* {hotel.SYReview && <HotelReviewPage hotel={{
              SYReview: hotel.SYReview,
              rating: hotel.rating
            }}/>} */}

            {
              <Card className="p-0">
                <CardHeader>
                  <CardTitle className="text-primary">Harita</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4085.7803973264354!2d28.774008699999996!3d41.1207371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caaf131b8120ed%3A0x6a3c9870d1646839!2sLocamarin%20Yat!5e1!3m2!1str!2str!4v1768987951566!5m2!1str!2str'}
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
            }

            {/* YouTube Video */}
            <Card className="md:w-1/2 mx-auto">
              <CardHeader>
                <CardTitle className="text-primary">Otel Tanıtım Videosu</CardTitle>
              </CardHeader>
              <CardContent>
                  <iframe
                    src={`https://www.instagram.com/reel/DTvfsM-iNw8/embed`}
                    title={`Locamarin Tanıtım Videosu`}
                    className="w-full aspect-[9/16]"
                    allowFullScreen
                  />
              </CardContent>
            </Card>


          </div>

        </div>
      </div>
    </div>
  )
}