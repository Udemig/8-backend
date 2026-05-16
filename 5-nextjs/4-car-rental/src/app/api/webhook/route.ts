import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  // 1) isteğin body kısmındaki ödeme ile alakalı gelen veriye eriş
  const body = await req.json();

  // 2) stripe'ın gönderdiği event'e eriş
  const session = body.data.object as Stripe.Checkout.Session;

  // 3) sipariş id'sine eriş
  const orderId = session.metadata?.orderId;

  switch (body.type) {
    // 4) ödeme başarılı olduysa sipariş durumunu paid yap
    case "checkout.session.completed":
      await Order.findByIdAndUpdate(orderId, { status: "paid" });
      break;
    // 5) ödeme başarısız olduysa sipariş durumunu cancelled  yap
    case "checkout.session.expired":
      await Order.findByIdAndUpdate(orderId, { status: "cancelled" });
      break;
  }

  return NextResponse.json("success");
}
