import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const data = await req.json()
  console.log({data});
  

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Yeni Rezervasyon - ${data.hotel.name}`,
      html: `<div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,Helvetica,sans-serif;background:#f8f9fa;border:1px solid #e5e5e5;border-radius:8px;">
  <h2 style="margin-top:0;color:#1a1a1a;border-bottom:2px solid #4caf50;padding-bottom:6px;">Yeni Rezervasyon</h2>

  <div style="background:#ffffff;padding:16px;border-radius:6px;border:1px solid #dddddd;margin-top:16px;">
    <p style="margin:8px 0;"><strong>Otel:</strong> ${data.hotel.name}</p>
    <p style="margin:8px 0;"><strong>Oda:</strong> ${data.room.roomName} (${data.room.mealPlan})</p>
    <p style="margin:8px 0;"><strong>Giriş:</strong> ${data.checkin}</p>
    <p style="margin:8px 0;"><strong>Çıkış:</strong> ${data.checkout}</p>
    <p style="margin:8px 0;">
      <strong>Misafir:</strong> ${data.adults} yetişkin, ${data.children} çocuk 
      <span style="color:#555;">(${data.childrenAges.join(', ')})</span>
    </p>

    <hr style="border:none;border-top:1px solid #ccc;margin:16px 0;" />

    <p style="margin:8px 0;"><strong>Ad Soyad:</strong> ${data.customer.name} ${data.customer.surname}</p>
    <p style="margin:8px 0;"><strong>Email:</strong> ${data.customer.email}</p>
    <p style="margin:8px 0;"><strong>Telefon:</strong> ${data.customer.phone}</p>

    <hr style="border:none;border-top:1px solid #ccc;margin:16px 0;" />

    <p style="margin:8px 0;font-size:18px;">
      <strong>Fiyat:</strong>
      <span style="color:#2e7d32;font-weight:bold;">₺${data.price}</span>
    </p>
  </div>
</div>
`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Mail gönderilemedi" }, { status: 500 })
  }
}
