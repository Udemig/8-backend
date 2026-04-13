import Link from "next/link";
import React from "react";

const Page1 = () => {
  return (
    <div className="my-50 text-center space-y-10 text-3xl">
      <h1>Sayfa-1</h1>

      <Link href="page1/page2" className="text-blue-500 underline text-lg">
        Sayfa-2'ye Yönlendir
      </Link>
    </div>
  );
};

export default Page1;
