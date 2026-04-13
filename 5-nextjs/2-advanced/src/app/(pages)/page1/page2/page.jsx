import Link from "next/link";

const Page2 = () => {
  return (
    <div className="my-50 text-center space-y-10 text-3xl">
      <h1>Sayfa-2</h1>

      <Link href="/page1" className="text-blue-500 underline text-lg">
        Sayfa-1'e Dön
      </Link>
    </div>
  );
};

export default Page2;
