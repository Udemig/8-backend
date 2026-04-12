import { fetchRecipes } from "@/utils/api";
import Link from "next/link";

const Header = async () => {
  const { recipes } = await fetchRecipes();

  return (
    <header className="p-5 md:px-10 border-b border-zinc-300 flex justify-between">
      <Link href="/">NEXT</Link>

      <nav className="flex gap-5">
        <Link href="/gallery">Galeri</Link>
        <Link href="/wonders">Harikalar</Link>
        <Link href="/recipes-client">Recipes (C)</Link>
        <Link href="/recipes-server">Recipes (S - {recipes.length})</Link>
      </nav>
    </header>
  );
};

export default Header;
