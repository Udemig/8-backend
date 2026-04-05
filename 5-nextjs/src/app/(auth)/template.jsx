"use client";
import Link from "next/link";
import { useState } from "react";

const Template = ({ children }) => {
  const [name, setName] = useState("");

  // Template'ları yetkilendirme için kullanabiliriz
  if ("admin değilse") {
    // anasayfaya yönlendir
  }

  return (
    <div className="flex  gap-5">
      <aside className="border p-5 flex flex-col gap-10 text-center">
        <h3>
          Selam, <b>{name}</b>
        </h3>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border border-zinc-500"
          placeholder="adınız.."
        />

        <Link href="/register">Kaydol</Link>
        <Link href="/login">Giriş Yap</Link>
        <Link href="/profile">Profil</Link>
      </aside>

      {children}
    </div>
  );
};

export default Template;
