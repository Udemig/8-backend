import delay from "@/utils/delay";

const Page = async () => {
  await delay(2000);
  // throw new Error("Veri bulunamadı");

  return <div>Gelir / Gider</div>;
};

export default Page;
