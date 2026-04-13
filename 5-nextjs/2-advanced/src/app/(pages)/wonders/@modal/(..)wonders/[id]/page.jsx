"use client";

import { data } from "@/utils/constants";
import Image from "next/image";
import { useRouter, useParams, notFound } from "next/navigation";

const DetailModal = () => {
  const { id } = useParams();
  const router = useRouter();

  if (id > 7) {
    return notFound();
  }

  // modal'da gösterilecek veriyi bul
  const wonder = data.find((item) => item.id === id);

  const handleClose = () => {
    // 1 sayfa geriye yönlendirir
    router.back();
    // 1 sayfa ileriye yönlendirir
    // router.forward();
    // belirli bir sayfaya yönlendirir
    // router.push("/dashboard");
    // belirli bir sayfaya yönlendirir geçmişi sil
    // router.replace("/dashboard");
    // sayfayaı tekrar renderla
    // router.refresh();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center">
      <div className="bg-white px-10 pb-10 text-black rounded-sm">
        <div className="flex justify-between my-5 text-lg">
          <button onClick={handleRefresh} className="btn">
            ?
          </button>
          <button onClick={handleClose} className="btn">
            X
          </button>
        </div>

        <Image src={wonder.src} alt={wonder.name} className="max-h-75 aspect-square w-full rounded-md object-cover" />

        <h1 className="text-center my-5 text-3xl">{wonder.name}</h1>

        <div className="my-10 text-lg">
          <h3>Fotoğrafçı</h3>
          <span>{wonder.photographer}</span>
        </div>

        <div className="my-10 text-lg">
          <h3>Lokasyon</h3>
          <span>{wonder.location}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
