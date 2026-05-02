"use server";

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation";

// server action: içersinde doğrudan vt soruguları yapabildiğimiz server fonksiyonları
export async function createTicketAction(formData: FormData) {
  // eğer düzenleme modunda ise formdaki id değerini alırız
  const id = formData.get("id");

  // form içerisinden gerekli verileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // veritabanına doğrudan erişim
  await connectMongo();

  id
    ? // düzenleme modudandaysak
      await Ticket.findByIdAndUpdate(id, rawData)
    : // oluşturma modudandaysak
      await Ticket.create(rawData);

  // ticket sayfasına yönlendir
  redirect("/tickets");
}
