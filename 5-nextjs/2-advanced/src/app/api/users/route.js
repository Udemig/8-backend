import { NextResponse } from "next/server";

// export const dynamic = "force-static";
// export const revalidate = 60;

export const GET = async () => {
  // client'a cevap gönder
  return NextResponse.json({
    message: "Kullanıcı Listesi",
    date: new Date().toLocaleTimeString(),
  });
};
