import { NextResponse as res } from "next/server";
import Ticket, { ITicket } from "../models/ticket";
import connectMongo from "@/utils/connect-mongo";

export async function POST(req: Request) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // isteği body kısmındaki veriyi al
    const body = (await req.json()) as ITicket;

    // veritabanına yeni ticket'ı kaydet
    const newTicket = await Ticket.create(body);

    // client'a cevap gönder
    return res.json({ message: "Ticket oluşturuldu", ticket: newTicket }, { status: 201 });
  } catch (err) {
    return res.json(
      {
        message: "Ticket oluşturulurken bir hata oluştu",
        error: err instanceof Error ? err.message : "Bilinmeyen hata!",
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  try {
    // veritabanına bağlan
    await connectMongo();

    // ticket verilerini al
    const tickets = await Ticket.find();

    // client'a cevap gönder
    return res.json({ message: "Ticketlar listelendi", tickets }, { status: 200 });
  } catch (err) {
    return res.json(
      {
        message: "Ticketlar alınırken bir hata oluştu",
        error: err instanceof Error ? err.message : "Bilinmeyen hata!",
      },
      { status: 400 },
    );
  }
}
