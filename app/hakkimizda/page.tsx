import { Award, Users, MapPin, Heart, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";

const About = () => {
  const stats = [
    { number: "50+", label: "Partner Otel" },
    { number: "10K+", label: "Mutlu Müşteri" },
    { number: "15+", label: "Yıllık Deneyim" },
    { number: "24/7", label: "Destek Hizmeti" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Müşteri Odaklı Hizmet",
      description: "Her müşterimizin özel ihtiyaçlarını anlayarak kişiselleştirilmiş hizmet sunuyoruz."
    },
    {
      icon: Award,
      title: "Kalite Garantisi",
      description: "Sadece en kaliteli otelleri seçiyor, sürekli denetim yaparak kaliteyi garanti ediyoruz."
    },
    {
      icon: CheckCircle,
      title: "Güvenilir Partnerlik",
      description: "15 yıllık deneyimimizle güvenilir ve şeffaf hizmet anlayışımızı sürdürüyoruz."
    },
    {
      icon: Clock,
      title: "7/24 Destek",
      description: "Tatil öncesi, sırası ve sonrasında her an yanınızda olmaya devam ediyoruz."
    }
  ];

  const team = [
    {
      name: "Ahmet Yılmaz",
      position: "Genel Müdür",
      description: "15 yıllık turizm deneyimi",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Elif Kaya",
      position: "Operasyon Müdürü", 
      description: "Müşteri deneyimi uzmanı",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Murat Özkan",
      position: "Satış Müdürü",
      description: "B2B ve B2C satış uzmanı",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center text-white overflow-hidden"
        style={{background: '#0f172a'}}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            15 yıldır Türkiye'nin en güzel otellerinde unutulmaz tatil deneyimleri yaratıyoruz
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/30 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Hikayemiz</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                2009 yılında kurduğumuz HelaTrip, Türkiye'nin en güzel destinasyonlarında kaliteli 
                tatil deneyimleri sunma vizyonuyla yola çıktı. Bugün 50'den fazla partner otelimiz 
                ve binlerce mutlu müşterimizle sektörün güvenilir markalarından biri haline geldik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Vizyonumuz</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Türkiye'nin turizm potansiyelini en iyi şekilde değerlendirerek, yerli ve yabancı 
                  turistlere unutulmaz deneyimler yaşatmak ve ülke turizmine katkıda bulunmak.
                </p>
                <h3 className="text-3xl font-bold mb-6">Misyonumuz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Müşterilerimizin beklentilerini aşan kaliteli hizmet sunarak, güven dolu bir tatil 
                  deneyimi yaratmak ve uzun vadeli müşteri ilişkileri kurmak.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={"./hotelImages/wome_1.jpg"} 
                  alt="Hikayemiz"
                  className="w-full h-80 object-cover rounded-2xl card-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30 shadow-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Değerlerimiz</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Her adımımızda bizi yönlendiren temel değerler ve ilkeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-card p-8 rounded-2xl card-shadow hover:float-shadow smooth-transition">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Ekibimiz</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deneyimli ve tutkulu ekibimizle size en iyi hizmeti sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden card-shadow group-hover:float-shadow smooth-transition">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-primary font-medium mb-2">{member.position}</div>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient text-white shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Bizimle İletişime Geçin</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tatil planlarınız için size özel öneriler almak ve sorularınızı yanıtlamak için buradayız
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="link" size="lg">
              İletişim
            </Button>
            <Button variant="link" size="lg">
              Otelleri İncele
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;