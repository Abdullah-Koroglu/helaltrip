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
}

export const hotels: Hotel[] = [
  {
    id: "wome-deluxe",
    name: "Wome Deluxe",
    slug: "wome-deluxe",
    location: "Antalya / Alanya",
    description: "Wome Deluxe Hotel Antalya, Alanya bölgesinde bulunmaktadır. Wome Deluxe Hotel denize sıfır konumuyla dikkat çekmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
    image: "/hotelImages/wome_1.jpg",
    youtubeVideoId: "xBWKvdzLl9A",
    price: 2500,
    rating: 4.8,
    amenities: ["Ücretsiz WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym"],
    features: ["Deniz Manzarası", "Merkezi Konum", "24/7 Hizmet", "Özel Plaj"]
  },
  {
    id: "angels-marmaris",
    name: "Angel's Marmaris",
    slug: "angels-marmaris",
    location: "Muğla / Marmaris",
    description: "2011 yılında yapılan Angels Marmaris Hotel Marmaris, Bozburun bölgesinde bulunmaktadır. 85000 m2 alanda kurulmuş olan Angels Marmaris Hotel alkolsüz herşey dahil konseptiyle misafirlerimize hizmet vermektedir.",
    image: "/hotelImages/angels_1.jpg",
    youtubeVideoId: "sU0mLh91sK4",
    price: 2200,
    rating: 4.7,
    amenities: ["Deniz Manzarası", "Özel Plaj", "Su Sporları", "Çocuk Kulübü", "Animasyon"],
    features: ["All Inclusive", "Aile Dostu", "Doğa İçinde", "Sakin Atmosfer"]
  },
  {
    id: "adenya-resort",
    name: "Adenya Resort",
    slug: "adenya-resort",
    location: "Antalya / Alanya",
    description: "Antalya, Alanya bölgesinde bulunan Adenya Hotel Resort en son 2013 yılında yenilenmiştir. Adenya Hotel Resort denize sıfır konumuyla dikkat çekmektedir. Tatiliniz boyunca çocuklarınızın güvenli bir şekilde ağırlanabilmesi için bebek bakımı bulunmaktadır.",
    image: "/hotelImages/adenya_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 3500,
    rating: 4.9,
    amenities: ["Özel Villa", "Infinity Havuz", "Spa Merkezi", "Golf Sahası", "Helikopter Transfer"],
    features: ["Ultra Lüks", "Özel Hizmet", "Doğa İçinde", "Gizlilik"]
  },
  {
    id: "sah-inn-paradise",
    name: "Şah Inn Paradise",
    slug: "sah-inn-paradise",
    location: "Antalya / Kumluca",
    description: "2007 yılında yapılan Şah Inn Paradise Antalya, Kumluca bölgesinde bulunmaktadır. Şah Inn Paradise denize sıfır konumuyla dikkat çekmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
    image: "/hotelImages/sahınn_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 2800,
    rating: 4.6,
    amenities: ["Deniz Manzarası", "Özel Plaj", "Yat Limanı", "Lüks Restoran", "Spa"],
    features: ["Bodrum Manzarası", "Yat Turu", "Gece Hayatı", "Lüks Alışveriş"]
  },
  {
    id: "the-oba",
    name: "The Oba",
    slug: "the-oba",
    location: "Muğla / Bodrum",
    description: "The Oba Hotel Bodrum Torba bölgesinde bulunmaktadır. Tesis alkolsüz herşey dahil konseptinde hizmet vermektedir. The Oba Hotel Bodrum denize sıfır konumuyla dikkat çekmektedir. 100 m uzunluğundaki sahile sahip tesisin kendine ait iskelesi vardır.",
    image: "/hotelImages/theoba_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 1800,
    rating: 4.5,
    amenities: ["Merkezi Konum", "İş Merkezi", "Toplantı Salonu", "Restoran", "Bar"],
    features: ["Tarihi Kale Manzarası", "İş Dostu", "Merkezi Konum", "Ulaşım Kolaylığı"]
  },
  {
    id: "adin-beach",
    name: "Adin Beach",
    slug: "adin-beach",
    location: "Antalya / Alanya",
    description: "Antalya, Alanya bölgesinde bulunan Adin Beach Hotel en son 2015 yılında yenilenmiştir. Adin Beach Hotel denize sıfır konumuyla dikkat çekmektedir. Tatiliniz boyunca çocuklarınızın güvenli bir şekilde ağırlanabilmesi için bebek bakımı bulunmaktadır.",
    image: "/hotelImages/adin_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 1600,
    rating: 4.4,
    amenities: ["Su Sporları", "Rüzgar Sörfü", "Plaj Bar", "Çocuk Havuzu", "Animasyon"],
    features: ["Su Sporları Merkezi", "Genç Atmosfer", "Plaj Aktivitesi", "Eğlenceli Ortam"]
  },
  {
    id: "bera-alanya",
    name: "Bera Alanya",
    slug: "bera-alanya",
    location: "Antalya / Alanya",
    description: "Bera Hotel Alanya Antalya, Alanya bölgesinde bulunmaktadır. 25000 m2 alanda kurulmuş olan Bera Hotel Alanya alkolsüz herşey dahil konseptiyle misafirlerimize hizmet vermektedir. Bera Hotel Alanya denize sıfır konumuyla dikkat çekmektedir.",
    image: "/hotelImages/bera_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 2000,
    rating: 4.6,
    amenities: ["Aile Havuzu", "Çocuk Kulübü", "Mini Golf", "Tenis Kortu", "Spa"],
    features: ["Aile Dostu", "Geniş Plaj", "Çocuk Aktiviteleri", "Güvenli Ortam"]
  },
  {
    id: "rizom-beach",
    name: "Rizom Beach",
    slug: "rizom-beach",
    location: "Antalya / Kumluca",
    description: "2022 yılında yapılan Rizom Beach Hotel Kumluca Antalya, Kumluca bölgesinde bulunmaktadır. Denize sıfır olan Rizom Beach Hotel Kumluca ile plaj arasından yol geçmektedir. Tesis çocukların da konforunu düşünmekte olup, bebek bakımı hizmeti sunmaktadır.",
    image: "/hotelImages/rizom_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 1900,
    rating: 4.5,
    amenities: ["Dağ Manzarası", "Doğa Yürüyüşü", "Havuz", "Restoran", "Bar"],
    features: ["Doğa İçinde", "Dağ Manzarası", "Huzurlu Ortam", "Temiz Hava"]
  },
  {
    id: "selge-beach",
    name: "Selge Beach",
    slug: "selge-beach",
    location: "Antalya / Manavgat",
    description: "1997 yılında yapılan Selge Beach Resort Spa Antalya, Side bölgesinde bulunmaktadır. Selge Beach Resort Spa denize sıfır konumuyla dikkat çekmektedir. Küçük misafirlerimize özel bebek bakımı mevcuttur.",
    image: "/hotelImages/selge_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 2100,
    rating: 4.7,
    amenities: ["Tarihi Manzara", "Antik Kent Turu", "Havuz", "Restoran", "Spa"],
    features: ["Tarihi Atmosfer", "Kültür Turu", "Deniz Manzarası", "Eğitimli Rehber"]
  },
  {
    id: "royal-teos",
    name: "Royal Teos",
    slug: "royal-teos",
    location: "İzmir / Seferihisar",
    description: "Royal Teos Thermal Resort Clinic Spa (Ex. Euphoria Aegean) İzmir, Seferihisar bölgesinde bulunmaktadır. 90000 m2 alanda kurulmuş olan Royal Teos Thermal Resort Clinic Spa (Ex. Euphoria Aegean) otel alkolsüz herşey dahil konseptiyle misafirlerimize hizmet vermektedir.",
    image: "/hotelImages/royalteos_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 3200,
    rating: 4.8,
    amenities: ["Özel Plaj", "Yat Limanı", "Lüks Villa", "Spa Merkezi", "Golf"],
    features: ["Ultra Lüks", "Yat Turu", "Özel Hizmet", "Gizlilik"]
  },
  {
    id: "rizom-tatil-koyu",
    name: "Rizom Tatil Köyü",
    slug: "rizom-tatil-koyu",
    location: "Çanakkale / Akçakeçili",
    description: "Rizom Tatil Köyü Yalova Merkez'de bulunmaktadır. Rizom Tatil Köyü denize sıfır konumuyla dikkat çekmektedir. Tesisin kendine özel kum plajı bulunmaktadır. 4 adet açık yüzme havuzu ile keyifli bir tatil yaşayabilirsiniz.",
    image: "/hotelImages/rizomtatil_1.jpg",
    youtubeVideoId: "dQw4w9WgXcQ",
    price: 1700,
    rating: 4.4,
    amenities: ["Tatil Köyü", "Çoklu Havuz", "Spor Alanları", "Çocuk Kulübü", "Animasyon"],
    features: ["Geniş Alan", "Çeşitli Aktivite", "Aile Dostu", "Doğa İçinde"]
  }
]; 