import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl text-yellow-500">404 :/</h1>

      <h2>Aradığınız sayfaya ulaşılamıyor</h2>

      <Link href="/">Anasayfa'ya Dön</Link>
    </div>
  );
};

export default NotFound;
