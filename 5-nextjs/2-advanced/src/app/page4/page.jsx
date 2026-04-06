import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="my-50 text-center space-y-10 text-3xl">
      <h1>Sayfa-4</h1>

      <Link href="page3" className="text-blue-500 underline text-lg">
        Sayfa-3'e Dön
      </Link>
    </div>
  );
};

export default Page;
