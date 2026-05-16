import { notFound, serverError, unauthorized } from "@/lib/api/errors";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import Order from "@/models/Order";
import { CheckoutBody, ICar } from "@/types/car.types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// stripe kurulum
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true });

// product catalog'a ürün ekleme fonksiyonu
const createStripeProduct = async (car: ICar) => {
  return await stripe.products.create({
    name: car.make + " " + car.modelName,
    description: car.description,
    default_price_data: {
      currency: "TRY",
      unit_amount: car.pricePerDay * 100,
    },
    metadata: {
      carId: car._id.toString(),
    },
  });
};

// product catalog'daki ürünü alma fonksiyonu
const getStripeProduct = async (car: ICar) => {
  const result = await stripe.products.search({
    query: `metadata["carId"]:"${car._id.toString()}"`,
  });

  return result.data[0] || null;
};

export async function POST(req: Request) {
  try {
    // veritabanına bağlan
    await connectDB();

    // kullanıcının oturum verisini al
    const session = await auth();

    // kullanıcı oturumu kapalıysa hata dön
    if (!session?.user) return unauthorized("Kullanıcı oturumu kapalı");

    // isteğin body bölümündeki veriye eriş
    const body: CheckoutBody = await req.json();

    // kiralanıcak aracın bilgilerini al
    const car: ICar | null = await Car.findById(body.carId);

    // araç bulunamadıysa hata dön
    if (!car) return notFound("Araç bulunamadı");

    // kiralanıcak araç product catalog'da var mı kontrol et
    let stripeProduct = await getStripeProduct(car);

    // eğer araç catalog'da yoksa aracı product catalog'a ekle
    if (!stripeProduct) {
      stripeProduct = await createStripeProduct(car);
    }

    // stripe tarafından oluşturlan productId değeribi ve kiralanıcak gün sayısını belirle
    const productInfo = {
      price: stripeProduct.default_price as string,
      quantity: Math.ceil(
        (new Date(body.returnDate).getTime() - new Date(body.pickupDate).getTime()) / (24 * 60 * 60 * 1000),
      ),
    };

    // sipariş verisini veritabanına kaydet
    const order = await Order.create({
      product: car._id,
      user: session.user.id,
      totalAmount: productInfo.quantity * car.pricePerDay,
      currency: "TRY",
      type: "rental",
      status: "pending",
      rental: {
        pickupDate: new Date(body.pickupDate),
        returnDate: new Date(body.returnDate),
        pickupTime: body.pickupTime,
        returnTime: body.returnTime,
        pickupLocation: body.pickupLocation,
        dropoffLocation: body.dropoffLocation,
        notes: body.notes,
        days: productInfo.quantity,
      },
    });

    // stripe ödeme oturumunu oluştur
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [productInfo],
      mode: "payment",
      metadata: {
        userId: session.user.id.toString(),
        orderId: order._id.toString(),
      },
      success_url: `${process.env.AUTH_URL}/success?orderId=${order._id.toString()}`,
      cancel_url: `${process.env.AUTH_URL}/cancel?orderId=${order._id.toString()}`,
      expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
    });

    // clienta cevap gönder
    return NextResponse.json({
      message: "Ödeme oturumu oluşturuldu",
      url: checkoutSession.url,
    });
  } catch (error) {
    return serverError("Ödeme oturumu oluşturulamadı");
  }
}
