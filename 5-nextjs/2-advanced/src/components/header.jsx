import { fetchRecipes } from "@/utils/api";
import Link from "next/link";
import Navlink from "./navlink";

const Header = async () => {
  const { recipes } = await fetchRecipes();

  return (
    <header className="p-5 md:px-10 border-b border-zinc-300 flex justify-between">
      <Link href="/">NEXT</Link>

      <nav className="flex gap-5">
        <Navlink href="/gallery">Galeri</Navlink>
        <Navlink href="/wonders">Harikalar</Navlink>
        <Navlink href="/recipes-client">Recipes (C)</Navlink>
        <Navlink href="/recipes-server">Recipes (S - {recipes.length})</Navlink>
      </nav>
    </header>
  );
};

export default Header;
