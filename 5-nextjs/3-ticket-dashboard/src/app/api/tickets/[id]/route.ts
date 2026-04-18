import connectMongo from "@/utils/connect-mongo";
import { NextResponse as res } from "next/server";
import Ticket, { ITicket } from "../../models/ticket";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // id'si bilinen elmanı al
    const ticket = await Ticket.findById(id);

    // ticket bulunamazsa hata gönder
    if (!ticket) throw Error("Ticket bulunamadı");

    // client'a cevap gönder
    return res.json({ message: "Ticket bulundu", ticket }, { status: 200 });
  } catch (err) {
    return res.json(
      {
        message: "Ticket aranırken bir hata oluştu",
        error: err instanceof Error ? err.message : "Bilinmeyen hata!",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // id'si bilinen elamanı kaldır
    const ticket = await Ticket.findByIdAndDelete(id);

    // ticket bulunamdıysa hata gönder
    if (!ticket) throw Error("Ticket bulunamadı");

    // client'a cevap gönder
    return res.json({ message: "Ticket silindi", ticket }, { status: 200 });
  } catch (err) {
    return res.json(
      {
        message: "Ticket silinirken bir hata oluştu",
        error: err instanceof Error ? err.message : "Bilinmeyen hata!",
      },
      { status: 400 },
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // body verisine eriş
    const body = (await req.json()) as ITicket;

    // ticket'ı güncelle
    const updatedTicket = await Ticket.findByIdAndUpdate(id, body, { new: true });

    // ticket bulunamadıysa hata gönder
    if (!updatedTicket) throw Error("Ticket bulunamadı");

    // client'a cevap gönder
    return res.json({ message: "Ticket güncellendi", ticket: updatedTicket }, { status: 200 });
  } catch (err) {
    return res.json(
      {
        message: "Ticket güncellenirlen bir hata oluştu",
        error: err instanceof Error ? err.message : "Bilinmeyen hata!",
      },
      { status: 400 },
    );
  }
}
