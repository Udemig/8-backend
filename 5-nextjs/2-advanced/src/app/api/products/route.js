import { NextResponse } from "next/server";

export const GET = async (req) => {
  // istek ile gelen arama parametrelerine erişme
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  // client'a cevap gönder
  return NextResponse.json({
    message: "Ürün Listesi",
    category,
    sort,
  });
};

export const POST = async (req) => {
  // isteğin body kısmında gelen veriye eriş
  const body = await req.json();

  // client'a cevap gönder
  return NextResponse.json(
    {
      message: "Yeni Ürün Eklendi",
      body,
    },
    { status: 201 }, // status code'unu ayarlardık
  );
};
