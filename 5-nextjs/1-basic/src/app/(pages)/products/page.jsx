// relative import
// import delay from "../../../utils/delay";

// absolute import
import delay from "@/utils/delay";

import Link from "next/link";

export const metadata = {
  title: "Ürünler",
  description: "En iyi ürünler burda..",
};

const Page = async () => {
  await delay(2500);
  // throw new Error("Sunucular aşırı yoğun");

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1>Ürünler Sayfası</h1>

      <Link href="/products/1">Ürün 1</Link>
      <Link href="/products/2">Ürün 2</Link>
      <Link href="/products/3">Ürün 3</Link>
      <Link href="/products/4">Ürün 4</Link>
      <Link href="/products/5">Ürün 5</Link>
    </div>
  );
};

export default Page;
