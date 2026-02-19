import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getTranslations } from "next-intl/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Frontend'den gelen locale değerini alıyoruz, yoksa varsayılan 'tr' kullanıyoruz
    const locale = data.locale || 'tr' 
    
    if (!data.email) {
      return NextResponse.json({ error: "E-posta adresi gereklidir" }, { status: 400 })
    }

    // Seçili dile göre çevirileri çekiyoruz
    const t = await getTranslations({ locale, namespace: 'DiscountEmail' })

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // ${t('description')}
    await transporter.sendMail({
      from: `"Helaltrip" <helaltrip@info.com>`,
      to: data.email,
      subject: t('subject'),
      html: `
        <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,Helvetica,sans-serif;background:#f8f9fa;border:1px solid #e5e5e5;border-radius:8px;text-align:center;">
          <h2 style="color:#1a1a1a;margin-bottom:10px;">${t('title')}</h2>
          <p style="color:#555;font-size:16px;line-height:1.5;">
            Below is your <strong>8% discount</strong> code that you can use on your next booking. Thank you for choosing us.
          </p>
          
          <div style="background:#e8f5e9;border:2px dashed #4caf50;padding:20px;margin:24px 0;border-radius:8px;">
            <span style="font-size:24px;font-weight:bold;color:#2e7d32;letter-spacing:2px;">HOSGELDIN8</span>
          </div>
          
          <p style="color:#777;font-size:14px;">
            ${t('footer')}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("İndirim maili gönderme hatası:", error)
    return NextResponse.json({ error: "Mail gönderilemedi" }, { status: 500 })
  }
}