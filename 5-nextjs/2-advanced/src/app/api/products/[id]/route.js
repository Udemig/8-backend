import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  // isteğin parametrelerine erişme yöntemi
  const { id } = await params;

  return NextResponse.json({
    message: "Detay Gönderildi",
    id,
  });
};

export const PATCH = async (req) => {
  // header erişme - v1
  const headerList = await headers();
  const token = headerList.get("Authorization");

  // cookies erişme - v1
  const cookieList = await cookies();
  const lang = cookieList.get("lang").value;

  // searchParams erişme - v1
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");

  return NextResponse.json({ message: "Ürün Güncellendi", token, lang, category });
};

export const PUT = async (req) => {
  // header erişme - v2
  const token = req.headers.get("Authorization");

  // cokies erişme - v2
  const lang = req.cookies.get("lang").value;

  // searchParams erişme - v2
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  return NextResponse.json({ message: "Ürün Güncellendi", token, lang, category });
};

export const DELETE = async () => {
  return NextResponse.json({
    message: "Ürün Silindi",
  });
};
