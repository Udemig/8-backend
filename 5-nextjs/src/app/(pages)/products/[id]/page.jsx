import Link from "next/link";
import { notFound } from "next/navigation";

// static metadata
// export const metadata = {
//   title: "Ürün Detay",
//   description: "ürün ile alakalı detaylar",
// };

// dinamik metadata
export const generateMetadata = async ({ params }) => {
  // url'deki id parametresine eriştik
  const { id } = await params;

  // ... api'dan ürün bilgilerini aldık ...

  // metada'yı return ederiz
  return {
    title: `${id} - Ürün Detay`,
  };
};

// Url'deki parametrelere props aracılığı ile erişiriz
const Page = async ({ params }) => {
  // Parametreler asenkron olduğu için await ile beklememiz gerekir
  const { id } = await params;

  // Eğer id geçersiz ise
  if (id < 1) {
    // 404 sayfasını ekrana basar
    notFound();
  }

  return (
    <div>
      <h1 className="text-red-500">{id}</h1>

      <h1>Ürün Detay Sayfası</h1>

      <Link href="/products">Geri Dön</Link>
    </div>
  );
};

export default Page;
