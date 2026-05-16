import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
import { badRequest, notFound, serverError, unauthorized } from "@/lib/api/errors";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return badRequest("Geçersiz sipariş id");
  }

  try {
    const session = await auth();

    if (!session?.user) return unauthorized("Kullanıcı oturumu kapalı");

    await connectDB();

    void Car;

    const order = await Order.findOne({ _id: id, user: session.user.id })
      .populate("product")
      .lean();

    if (!order) return notFound("Sipariş bulunamadı");

    return Response.json({ data: order });
  } catch (err) {
    console.error("[GET /api/orders/:id]", err);
    return serverError("Sipariş alınamadı");
  }
}
