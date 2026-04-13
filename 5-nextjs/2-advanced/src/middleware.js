import { NextResponse } from "next/server";

export function middleware(req) {
  // 1. Logging - Tüm istekleri logla
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname}`);

  // 2. CORS Headers
  req.headers.set("cors", "gerekli ayarlar");

  // 3. Güvenlik Headers
  req.header.set("helmet", "gerekli headerla");

  // 4. Route Koruması
  if (req.nextUrl.pathname === "/admin") {
    const token = req.cookies.get("authorization");
    if (!token) return NextResponse.redirect("/");
  }

  // 5. Rate Limiting
  const ip = req.headers.get("x-forwarded-for");
  console.log("IP", ip);

  return NextResponse.next();
}

// middleware'in hangi route/sayfa'larda çalışacağını belirliyoruz
export const config = {
  matcher: ["/recipes-server", "/api/:path*"],
};
