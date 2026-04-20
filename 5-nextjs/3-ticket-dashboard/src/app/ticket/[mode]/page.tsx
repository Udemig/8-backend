import Form from "@/components/form";
import { Ticket } from "@/types";
import { getTicketById } from "@/utils/service";
import { FC } from "react";

interface Props {
  params: Promise<{
    mode: string;
  }>;
}

const Page: FC<Props> = async ({ params }) => {
  // url'deki parametreye eriş
  const { mode } = await params;

  // aldığımız parmetreye göre form'un hangi modda çalışacağını belirle
  const isEditMode = mode !== "add" ? true : false;

  // güncellenicek eleman
  let editItem: Ticket | null = null;

  // eğer güncelleme modundaysak güncellenecek ticket'ı al
  if (isEditMode) {
    editItem = (await getTicketById(mode)).ticket;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl text-zinc-500">{isEditMode ? "Ticket'ı Güncelle" : "Ticket Oluştur"}</h1>

      <Form isEditMode={isEditMode} editItem={editItem} />
    </div>
  );
};

export default Page;
