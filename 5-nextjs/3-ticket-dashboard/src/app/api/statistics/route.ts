import connectMongo from "@/utils/connect-mongo";
import { NextResponse as res } from "next/server";
import Ticket from "../models/ticket";

export async function GET() {
  try {
    // veritabanına bağlan
    await connectMongo();

    // veritabanından ticket'ları al
    const tickets = await Ticket.find();

    // toplam ticket sayısını hesapl
    const totalTickets = tickets.length;

    // kategoriye göre dağılım
    const ticketsByCategory = tickets.reduce((obj, ticket) => {
      obj[ticket.category] = (obj[ticket.category] || 0) + 1;

      return obj;
    }, {});

    // kategoriye göre dağılım
    const ticketsByStatus = tickets.reduce((obj, ticket) => {
      obj[ticket.status] = (obj[ticket.status] || 0) + 1;

      return obj;
    }, {});

    // çözüm oranı
    const completedTickets = tickets.filter((ticket) => ticket.status === "Çözüldü").length;
    const completionRate = totalTickets > 0 ? +((completedTickets / totalTickets) * 100).toFixed(1) : 0;

    // kritik öncelikli ticket'ları al
    const criticalTicket = tickets.filter((ticket) => ticket.priority > 4).length;

    // ortalama öncelik değerini hesapla
    const averagePriority = +(tickets.reduce((total, ticket) => total + ticket.priority, 0) / totalTickets).toFixed(1);

    // todo: tarihleri hesapla

    // tarihe göre hesapla

    // client'a cevap gönder
    return res.json({
      message: "İstatistikler hesaplandı",
      totalTickets,
      ticketsByCategory,
      ticketsByStatus,
      completedTickets,
      completionRate,
      criticalTicket,
      averagePriority,
    });
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
