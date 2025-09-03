import fs from "fs";
import * as cheerio from "cheerio";

// HTML içeriği dosyadan oku (örnek: reviews.html)
const html = fs.readFileSync("reviews.html", "utf8");
const $ = cheerio.load(html);

// JSON sonucu tutacak array
const reviews = [];

$(".SEzcUb.gr5LV").each((_, el) => {
  const container = $(el);

  // Kullanıcı adı
  const name = container.find(".X8zlde").text().trim();

  // Profil resmi
  const profileImage = container.find(".MJSpod").css("background-image")
    ? container.find(".MJSpod").css("background-image").replace(/^url\(["']?/, "").replace(/["']?\)$/, "")
    : null;

  // Platform
  const platform = container.find(".LzaSVd a").text().trim();

  // Puan (örnek: "5/5")
  const rating = container.find(".QRCoQb").text().trim();

  // Tarih
  const date = container.find(".YLpWtd").text().replace("·", "").trim();

  // Yorum metni
  const text = container.find(".rooNW .Vz1Vkc").text().trim();

  reviews.push({
    name,
    profileImage,
    platform,
    rating,
    date,
    text,
  });
});

// JSON çıktısını yazdır
fs.writeFileSync("reviews.json", JSON.stringify(reviews, null, 2), "utf8");

console.log("✅ reviews.json oluşturuldu!");
