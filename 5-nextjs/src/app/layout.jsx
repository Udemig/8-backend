import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Metadata içeriği
export const metadata = {
  title: {
    default: "Amazon", // varsayılan başlık
    template: "%s | Amazon", // özelleştirme
  },
  description: "Dünyanın en iyi alışveriş sitesi",
  author: "yapımcı",
  keywords: ["alışveriş", "ürün", "amazon"],
};

// Layout, ekrana basılan sayfa içeriğine children propu aracılığıyla erişir
// Bu layout dosyası app klasörü içerisinde olduğu için bütün sayfalarasa etkiler
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 page">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
