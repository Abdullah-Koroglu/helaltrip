export interface Hotel {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  image: string;
  youtubeVideoId: string;
  price: number;
  rating: number;
  amenities: string[];
  features: string[];
  imageSlug: string;
  priceId: string | null;
  agencyLink?: string;
  mapLink?: string;
  SYReview?: string;
}

export const hotels: Hotel[] = [
  {
    id: "wome-deluxe",
    priceId: "227",
    name: "Wome Deluxe",
    slug: "wome-deluxe",
    location: "Antalya / Alanya",
    description: "Wome Deluxe Hotel Antalya, Alanya bölgesinde bulunmaktadır. Wome Deluxe Hotel denize sıfır konumuyla dikkat çekmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
    image: "/hotelImages/wome_1.jpg",
    imageSlug: "wome",
    youtubeVideoId: "xBWKvdzLl9A",
    price: 2500,
    rating: 4.8,
    amenities: ["Ücretsiz WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym"],
    features: ["Deniz Manzarası", "Merkezi Konum", "24/7 Hizmet", "Özel Plaj"],
    agencyLink: "https://www.wome.com.tr/tr/acenteler",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4352.496438740863!2d31.754110076796746!3d36.63032297229603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dc98853d3ee249%3A0xbbfd95bcfad09755!2sWome%20Deluxe!5e1!3m2!1str!2str!4v1767528434808!5m2!1str!2str",
    SYReview: `
    <p>Wome Deluxe otel için seneler önce İslami otellerin Mercedesi demiştim. Zaman geçtikçe bu kanaatimin doğru olduğu ortaya çıktı.Bu otele geldiğinizde kendinizi evinizde gibi hissedebilir ve sizlere hizmet eden personelleri aileden biri gibi görebilirsiniz.</p>

<p>Alanya bölgesinin en nezih kumsalı İncekum plajına bitişik olması ve deniz suyunun kalitesi herkes tarafından kabul edilmiştir. Mutfakta meşhur maestro Ahmet ustanın showları ve maharetleri herkesin dilindedir.</p>

<p>Bu otelin ormanlık alan içinde bulunması balayı çiftlerinin çok tercih etmesine sebep olmuştur. Aquaparkı etkinlik ve animasyonları her zaman beğenilmektedir. Bu otele bir defa gelenlerin çoğu uzun yıllar bu oteli tercih etmeye devam etmektedir.</p>

`
  },
  {
    id: "angels-marmaris",
    priceId: null,
    name: "Angel's Marmaris",
    slug: "angels-marmaris",
    location: "Muğla / Marmaris",
    description: "2011 yılında yapılan Angels Marmaris Hotel Marmaris, Bozburun bölgesinde bulunmaktadır. 85000 m2 alanda kurulmuş olan Angels Marmaris Hotel alkolsüz herşey dahil konseptiyle misafirlerimize hizmet vermektedir.",
    image: "/hotelImages/angels_1.jpg",
    imageSlug: "angels",
    youtubeVideoId: "udIZfBMt478",
    price: 2200,
    rating: 5,
    amenities: ["Deniz Manzarası", "Özel Plaj", "Su Sporları", "Çocuk Kulübü", "Animasyon"],
    features: ["All Inclusive", "Aile Dostu", "Doğa İçinde", "Sakin Atmosfer"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4344.6036490031065!2d28.110097476801545!3d36.76984127225589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bfc7d5ed548783%3A0xdc2bbdb4836d8a7d!2sAngel's%20Marmaris%20Hotel!5e1!3m2!1str!2str!4v1767881685920!5m2!1str!2str",
  },
  {
    id: "adenya-resort",
    priceId: "2",
    name: "Adenya Resort",
    slug: "adenya-resort",
    location: "Antalya / Alanya",
    description: "Antalya, Alanya bölgesinde bulunan Adenya Hotel Resort en son 2013 yılında yenilenmiştir. Adenya Hotel Resort denize sıfır konumuyla dikkat çekmektedir. Tatiliniz boyunca çocuklarınızın güvenli bir şekilde ağırlanabilmesi için bebek bakımı bulunmaktadır.",
    image: "/hotelImages/adenya_1.jpg",
    imageSlug: "adenya",
    youtubeVideoId: "sU0mLh91sK4",
    price: 3500,
    rating: 4.8,
    amenities: ["Özel Villa", "Infinity Havuz", "Spa Merkezi", "Golf Sahası", "Helikopter Transfer"],
    features: ["Ultra Lüks", "Özel Hizmet", "Doğa İçinde", "Gizlilik"],
    agencyLink: 'https://adenyahotels.com.tr/yetkili-acentelerimiz',
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4353.884455379811!2d31.772332091170274!3d36.60574020088923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dcafba09212657%3A0x79a67792c7df74d4!2sAdenya%20Resort%20Hotels%20%26%20Spa!5e1!3m2!1str!2str!4v1767784883987!5m2!1str!2str",
    SYReview: `<p>Adenya Otel, bayanların en çok sevdiği otel olarak öne çıkmaktadır. Mısır’dan özel getirilen kumları ve otel odalarından kolayca ulaşılan harika kumsalı ile sektörün inci oteli olarak anılır.</p>

<p>Bu otele adım attığınız anda içerisindeki huzur ve dinginlik hemen ruhunuzu sarar. Güleryüzlü ve çalışkan personeli sayesinde kendinizi her an değerli hissedersiniz.</p>

<p>Adenya Otel’de geçirdiğiniz güzel zamanların etkisiyle, bir sonraki yıl tekrar gelme isteğiniz doğal olarak oluşur. Henüz denememiş olanlara tavsiye olarak, ilk fırsatta rezervasyon yapıp bu mükemmel tatili deneyimlemeleri yeterli olacaktır.</p>
`
  },
  {
    id: "sah-inn-paradise",
    priceId: null,
    name: "Şah Inn Paradise",
    slug: "sah-inn-paradise",
    location: "Antalya / Kumluca",
    description: "2007 yılında yapılan Şah Inn Paradise Antalya, Kumluca bölgesinde bulunmaktadır. Şah Inn Paradise denize sıfır konumuyla dikkat çekmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
    image: "/hotelImages/sahınn_1.jpg",
    imageSlug: "sahınn",
    youtubeVideoId: "BrY38hcGAFQ",
    price: 2800,
    rating: 4.7,
    amenities: ["Deniz Manzarası", "Özel Plaj", "Yat Limanı", "Lüks Restoran", "Spa"],
    features: ["Bodrum Manzarası", "Yat Turu", "Gece Hayatı", "Lüks Alışveriş"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4371.0375646807715!2d30.320454676786063!3d36.30076447239366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c224bccd87cd6f%3A0x8bf102de835154e2!2zxZ5haCBpbm4gUGFyYWRpc2UgVGF0aWwgS8O2ecO8!5e1!3m2!1str!2str!4v1767784851146!5m2!1str!2str",

  },
  {
    id: "the-oba",
    priceId: "8729",
    name: "The Oba",
    slug: "the-oba",
    location: "Muğla / Bodrum",
    description: "The Oba Hotel Bodrum Torba bölgesinde bulunmaktadır. Tesis alkolsüz herşey dahil konseptinde hizmet vermektedir. The Oba Hotel Bodrum denize sıfır konumuyla dikkat çekmektedir. 100 m uzunluğundaki sahile sahip tesisin kendine ait iskelesi vardır.",
    image: "/hotelImages/theoba_1.jpg",
    imageSlug: "theoba",
    youtubeVideoId: "juFBaSZ62zM",
    price: 1800,
    rating: 4.9,
    amenities: ["Merkezi Konum", "İş Merkezi", "Toplantı Salonu", "Restoran", "Bar"],
    features: ["Tarihi Kale Manzarası", "İş Dostu", "Merkezi Konum", "Ulaşım Kolaylığı"],
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4325.680946457982!2d27.499391176812615!3d37.10249607216236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be69712a10bd87%3A0x53202d97fed60bc0!2sThe%20Oba%20Hotel!5e1!3m2!1str!2str!4v1767866440912!5m2!1str!2str',
    SYReview: `
    
    
    <p>
The Oba Otel Bodrum denildiğinde, nedense aklıma deniz kenarında yediğim özel pirzolalar geliyor.
Ala carte servis tarzının en hızlı uygulandığı yerlerden biri.
Yemekleri sadece kahvaltıda açık büfe olarak alıyorsunuz;
öğle ve akşam yemekleri ise menüden sipariş edilerek hızlıca masanıza geliyor.
Yemek kalitesi gerçekten üst düzey.
</p>

<p>
Garsonlar son derece güler yüzlü ve servis hızı oldukça iyi.
Bayanlar plajı; denizi, havuzları ve ortak alanlarıyla birlikte tatmin edici bir büyüklüğe sahip.
Çocuklar için planlanmış aquapark çok büyük olmasa da yeterli bir hizmet sunuyor.
</p>

<p>
Bodrum’un eşsiz denizinde helal tatil yapmak isteyenler için alternatifsiz tek yer diyebilirim.
Fiyatlarına gelince, ucuz olduğunu söyleyemem.
Ancak konfor için parasını kolay harcayabilen müşterilerime burayı mutlaka öneriyorum.
</p>


`
  },
  {
    id: "adin-beach",
    priceId: "135",
    name: "Adin Beach",
    slug: "adin-beach",
    location: "Antalya / Alanya",
    description: "Antalya, Alanya bölgesinde bulunan Adin Beach Hotel en son 2015 yılında yenilenmiştir. Adin Beach Hotel denize sıfır konumuyla dikkat çekmektedir. Tatiliniz boyunca çocuklarınızın güvenli bir şekilde ağırlanabilmesi için bebek bakımı bulunmaktadır.",
    image: "/hotelImages/adin_1.jpg",
    imageSlug: "adin",
    youtubeVideoId: "mfqxXQ_8tfc",
    price: 1600,
    rating: 4.6,
    amenities: ["Su Sporları", "Rüzgar Sörfü", "Plaj Bar", "Çocuk Havuzu", "Animasyon"],
    features: ["Su Sporları Merkezi", "Genç Atmosfer", "Plaj Aktivitesi", "Eğlenceli Ortam"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4353.752514890285!2d31.78238767679615!3d36.60807757230262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dcafa31983fbc1%3A0xb5ae2e1e87be4d51!2sAdin%20Beach%20Hotel!5e1!3m2!1str!2str!4v1767784971002!5m2!1str!2str",

  },
  {
    id: "bera-alanya",
    priceId: "1",
    name: "Bera Alanya",
    slug: "bera-alanya",
    location: "Antalya / Alanya",
    description: "Bera Hotel Alanya Antalya, Alanya bölgesinde bulunmaktadır. 25000 m2 alanda kurulmuş olan Bera Hotel Alanya alkolsüz herşey dahil konseptiyle misafirlerimize hizmet vermektedir. Bera Hotel Alanya denize sıfır konumuyla dikkat çekmektedir.",
    image: "/hotelImages/bera_1.jpg",
    imageSlug: "bera",
    youtubeVideoId: "uy3zfL7kHWY",
    price: 2000,
    rating: 4.5,
    amenities: ["Aile Havuzu", "Çocuk Kulübü", "Mini Golf", "Tenis Kortu", "Spa"],
    features: ["Aile Dostu", "Geniş Plaj", "Çocuk Aktiviteleri", "Güvenli Ortam"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4355.349602901397!2d31.882808676795126!3d36.57977597231075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dca48e964b8b59%3A0x7a3e9ddb89ed97bd!2sBera%20Alanya%20Otel!5e1!3m2!1str!2str!4v1767785002245!5m2!1str!2str",

  },
  {
    id: "rizom-beach",
    priceId: "325448",
    name: "Rizom Beach",
    slug: "rizom-beach",
    location: "Antalya / Kumluca",
    description: "2022 yılında yapılan Rizom Beach Hotel Kumluca Antalya, Kumluca bölgesinde bulunmaktadır. Denize sıfır olan Rizom Beach Hotel Kumluca ile plaj arasından yol geçmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
    image: "/hotelImages/rizom_1.jpg",
    imageSlug: "rizom",
    youtubeVideoId: "9i9Z90ulP4I",
    price: 1900,
    rating: 4.5,
    amenities: ["Dağ Manzarası", "Doğa Yürüyüşü", "Havuz", "Restoran", "Bar"],
    features: ["Doğa İçinde", "Dağ Manzarası", "Huzurlu Ortam", "Temiz Hava"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4370.015596470016!2d30.26145127678657!3d36.31899647238835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c2252ce1848b7f%3A0x6ec87e5c8afb0675!2sRizom%20Beach%20Hotel%20Kumluca!5e1!3m2!1str!2str!4v1767785037563!5m2!1str!2str"
  },
  {
    id: "selge-beach",
    priceId: "142",
    name: "Selge Beach",
    slug: "selge-beach",
    location: "Antalya / Manavgat",
    description: "1997 yılında yapılan Selge Beach Resort Spa Antalya, Side bölgesinde bulunmaktadır. Selge Beach Resort Spa denize sıfır konumuyla dikkat çekmektedir. Küçük misafirlerimize özel bebek bakımı mevcuttur.",
    image: "/hotelImages/selge_1.jpg",
    imageSlug: "selge",
    youtubeVideoId: "zEgBKH2nOUk",
    price: 2100,
    rating: 4.5,
    amenities: ["Tarihi Manzara", "Antik Kent Turu", "Havuz", "Restoran", "Spa"],
    features: ["Tarihi Atmosfer", "Kültür Turu", "Deniz Manzarası", "Eğitimli Rehber"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4346.85267995899!2d31.523210076800112!3d36.73013227226738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6532e31f387%3A0x6bb9283611cae208!2sSelge%20Beach%20Resort!5e1!3m2!1str!2str!4v1767785073207!5m2!1str!2str"
  },
  // {
  //   id: "royal-teos",
  //   priceId: "465835",
  //   name: "Royal Teos",
  //   slug: "royal-teos",
  //   location: "İzmir / Seferihisar",
  //   description: "Royal Teos Thermal Resort Clinic Spa (Ex. Euphoria Aegean) İzmir, Seferihisar bölgesinde bulunmaktadır. 90000 m2 alanda kurulmuş olan Royal Teos Thermal Resort Clinic Spa (Ex. Euphoria Aegean) otel alkolsüz herşey dahil konseptiyle misafirlerimize hizmet vermektedir.",
  //   image: "/hotelImages/royalteos_1.jpg",
  //   imageSlug: "royalteos",
  //   youtubeVideoId: "uMrq05x_d70",
  //   price: 3200,
  //   rating: 4.2,
  //   amenities: ["Özel Plaj", "Yat Limanı", "Lüks Villa", "Spa Merkezi", "Golf"],
  //   features: ["Ultra Lüks", "Yat Turu", "Özel Hizmet", "Gizlilik"],
  //   mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4262.414275198542!2d26.772522476849698!3d38.1966816718821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bb8cc2c5861add%3A0x4db9ea7992cbb03d!2sRoyal%20Teos%20Resort%20Clinic%20%26%20Spa!5e1!3m2!1str!2str!4v1767785136564!5m2!1str!2str"
  // },
  {
    id: "mola-istanbul",
    priceId: "716488",
    name: "Mola İstanbul",
    slug: "mola-istanbul",
    location: "İstanbul / Silivri",
    description: "Rizom Tatil Köyü Yalova Merkez'de bulunmaktadır. Rizom Tatil Köyü denize sıfır konumuyla dikkat çekmektedir. Tesisin kendine özel kum plajı bulunmaktadır. 4 adet açık yüzme havuzu ile keyifli bir tatil yaşayabilirsiniz.",
    image: "/hotelImages/mola_1.jpg",
    imageSlug: "mola",
    youtubeVideoId: "xLWlz2LZhA8",
    price: 1700,
    rating: 4.7,
    amenities: ["Tatil Köyü", "Çoklu Havuz", "Spor Alanları", "Çocuk Kulübü", "Animasyon"],
    features: ["Geniş Alan", "Çeşitli Aktivite", "Aile Dostu", "Doğa İçinde"],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4086.167174274347!2d28.365645076952998!3d41.11452377133594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b541a5a3f9465d%3A0x1d945c4ea50e7354!2sMola%20%C4%B0stanbul!5e1!3m2!1str!2str!4v1767785104039!5m2!1str!2str"
  },
  {
    id: "rizom-assos-koyu",
    priceId: "716488",
    name: "Rizom Assos Tatil Köyü",
    slug: "rizom-assos-koyu",
    location: "Çanakkale / Akçakeçili",
    description: "Rizom Tatil Köyü Yalova Merkez'de bulunmaktadır. Rizom Tatil Köyü denize sıfır konumuyla dikkat çekmektedir. Tesisin kendine özel kum plajı bulunmaktadır. 4 adet açık yüzme havuzu ile keyifli bir tatil yaşayabilirsiniz.",
    image: "/hotelImages/rizomtatil_1.jpg",
    imageSlug: "rizomtatil",
    youtubeVideoId: "eiTWAOzd-o0",
    price: 1700,
    rating: 4.4,
    amenities: ["Tatil Köyü", "Çoklu Havuz", "Spor Alanları", "Çocuk Kulübü", "Animasyon"],
    features: ["Geniş Alan", "Çeşitli Aktivite", "Aile Dostu", "Doğa İçinde"]
    },
  // {
  //   id: "loca-marin",
  //   priceId: "999999999",
  //   name: "Locamarin Yat Tatili",
  //   slug: "loca-marin",
  //   location: "Muğla / Göcek",
  //   description: "",
  //   image: "/hotelImages/locamarin_1.jpg",
  //   imageSlug: "locamarin",
  //   youtubeVideoId: "",
  //   price: 1700,
  //   rating: 4.6,
  //   amenities: ["Yat Turu"],
  //   features: ["Yat Turu"],
  //   mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4992.535361260812!2d28.94116072807842!3d36.75340050866275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c065fa398fef15%3A0x8de56199ebeef49d!2zR8O2Y2VrLCBGZXRoaXllL011xJ9sYSwgVMO8cmtpeWU!5e1!3m2!1str!2sus!4v1768389421095!5m2!1str!2sus"
  //   },
  // {
  //   id: "zeyda-kemer",
  //   priceId: "716355",
  //   name: "Zeyda Kemer",
  //   slug: "zeyda-kemer",
  //   location: "Antalya / Kemer",
  //   description: "Zeyda Kemer Hotel Kemer Antalya, Kemer bölgesinde bulunmaktadır. Zeyda Kemer Hotel denize sıfır konumuyla dikkat çekmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
  //   image: "/hotelImages/zeyda_1.jpg",
  //   imageSlug: "zeyda",
  //   youtubeVideoId: "dQw4w9WgXcQ",
  //   price: 1700,
  //   rating: 4.4,
  //   amenities: ["Tatil Köyü", "Çoklu Havuz", "Spor Alanları", "Çocuk Kulübü", "Animasyon"],
  //   features: ["Geniş Alan", "Çeşitli Aktivite", "Aile Dostu", "Doğa İçinde"]
  // },
  // {
  //   id: "zeyda-lara",
  //   priceId: "716356",
  //   name: "Zeyda Lara",
  //   slug: "zeyda-lara",
  //   location: "Antalya",
  //   description: "",
  //   image: "/hotelImages/zeyda_1.jpg",
  //   imageSlug: "zeyda",
  //   youtubeVideoId: "dQw4w9WgXcQ",
  //   price: 1700,
  //   rating: 4.4,
  //   amenities: ["Tatil Köyü", "Çoklu Havuz", "Spor Alanları", "Çocuk Kulübü", "Animasyon"],
  //   features: ["Geniş Alan", "Çeşitli Aktivite", "Aile Dostu", "Doğa İçinde"]
  // }
]; 