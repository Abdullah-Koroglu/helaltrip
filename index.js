const fs = require('fs');
const path = require('path');
const axios = require('axios');

const hotels = [
  "rizomtatil",
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const downloadDir = path.join(__dirname, 'hotelImages');

// Klasörü oluştur (yoksa)
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    console.error(`Hata: ${url} indirilemedi`, err.message);
  }
}

(async () => {
  for (const hotel of hotels) {
    for (const number of numbers) {
      const url = `https://www.helaltrip.com/image/catalog/${hotel}/r${number}.jpg`;
      const filePath = path.join(downloadDir, `${hotel}_${number}.jpg`);
      console.log(`İndiriliyor: ${url}`);
      await downloadImage(url, filePath);
    }
  }
  console.log('Tüm resimler indirildi.');
})();
