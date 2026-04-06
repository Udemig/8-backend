import Link from "next/link";

const Header = () => {
  return (
    <header className="p-5 md:px-10 border-b border-zinc-300 flex justify-between">
      <Link href="/">NEXT</Link>

      <nav className="flex gap-5">
        <Link href="/dashboard">Admin Paneli</Link>
        <Link href="/gallery">Galeri</Link>
        <Link href="/wonders">Harikalar</Link>
        <Link href="/about">Hakkımızda</Link>
      </nav>
    </header>
  );
};

export default Header;
