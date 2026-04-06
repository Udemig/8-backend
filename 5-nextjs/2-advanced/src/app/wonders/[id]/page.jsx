import { data } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const Detail = async ({ params }) => {
  // url'deki parametreye eriş
  const { id } = await params;

  // gösterilecek harikanın verisini data'dan bul
  const wonder = data.find((item) => item.id === id);

  return (
    <div className="min-h-screen mx-auto text-3xl">
      <div className="w-3/4 lg:w-1/2 mx-auto">
        <Link href="/wonders" className="text-blue-500 underline text-xl">
          Geri
        </Link>

        <h1 className="text-center text-5xl font-bold mt-10 mb-5">{wonder.name}</h1>

        <Image src={wonder.src} alt={wonder.name} className="w-full aspect-square object-cover rounded-md" />

        <div className="my-10">
          <h3 className="text-lg">Fotoğrafçı</h3>
          <span>{wonder.photographer}</span>
        </div>

        <div className="my-10">
          <h3 className="text-lg">Lokasyon</h3>
          <span>{wonder.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
