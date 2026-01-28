import { Header } from "@/components/header";
import Image from "next/image";

export const metadata = {
  title: "Turizm Seyahat Acentası Belgemiz",
  description: "Helaltrip Turizm Seyahat Acentası Belgesi",
};

export default function BelgelerPage() {
  return (
    <>
    <Header />
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>
        Turizm Seyahat Acentası Belgemiz
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <Image
          src="/tursab.jpg"
          alt="Turizm Seyahat Acentası Belgesi"
          width={700}
          height={1000}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            maxWidth: "100%",
            height: "auto"
          }}
        />
      </div>

      <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.6 }}>
        Helaltrip, <strong>TÜRSAB’a bağlı</strong> bir turizm seyahat acentesidir.
        <br />
        TÜRSAB Belge Numarası: <strong>13707</strong>
      </p>

    </main>
    </>
  );
}
