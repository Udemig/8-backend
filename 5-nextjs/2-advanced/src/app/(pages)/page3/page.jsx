import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="my-50 text-center space-y-10 text-3xl">
      <h1>Sayfa-3</h1>

      <Link href="page4" className="text-blue-500 underline text-lg">
        Sayfa-4'ye Yönlendir
      </Link>
    </div>
  );
};

export default Page;
