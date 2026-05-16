import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { XCircle } from "lucide-react";

import { auth } from "@/lib/auth";
import { fetchOrder } from "@/services/order.service";
import OrderSummary from "@/components/orders/OrderSummary";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ orderId?: string }>;

export default async function CancelPage({ searchParams }: { searchParams: SearchParams }) {
  const { orderId } = await searchParams;
  if (!orderId) notFound();

  const session = await auth();
  if (!session?.user) redirect("/login");

  const order = await fetchOrder(orderId);
  if (!order) notFound();

  const orderRef = String(order._id).slice(-8).toUpperCase();
  const carId = String(order.product._id);

  return (
    <div className="max-w-180 mx-auto px-6 lg:px-16 py-12 flex flex-col gap-6">
      <div className="bg-card rounded-card p-8 flex flex-col items-center gap-3 text-center">
        <span className="size-16 rounded-pill bg-discount/10 text-discount flex items-center justify-center">
          <XCircle size={36} strokeWidth={2.25} />
        </span>
        <h1 className="text-secondary-500 text-2xl font-bold">Ödeme İptal Edildi</h1>
        <p className="text-secondary-400 text-sm">Ödeme tamamlanmadı. Hesabınızdan herhangi bir tahsilat yapılmadı.</p>
        <p className="text-secondary-500 text-sm font-semibold tracking-wider">Sipariş #{orderRef}</p>
      </div>

      <OrderSummary order={order} />

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/cars/${carId}`}
          className="bg-primary hover:opacity-90 text-white text-sm font-semibold h-12 rounded inline-flex items-center justify-center px-6 flex-1 py-2"
        >
          Tekrar Dene
        </Link>
        <Link
          href="/"
          className="border border-border bg-card text-secondary-500 hover:opacity-90 text-sm font-semibold h-12 rounded inline-flex items-center justify-center px-6 flex-1 py-2"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
