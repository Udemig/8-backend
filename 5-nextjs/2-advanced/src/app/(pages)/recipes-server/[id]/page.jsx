import { fetchRecipeById, fetchRecipes } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

// SSG
// Bu fonksiyondan return ettiğimiz parametreler için statik sayfalar oluşur
export const generateStaticParams = async () => {
  // api'dan tarif verisini al
  const { recipes } = await fetchRecipes();

  // hangi parametrelere sahip sayfaları statik hale getirceğimizi belirleriz
  return recipes.map((r) => ({ id: String(r.id) }));
};

const Page = async ({ params }) => {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);

  return (
    <div className="flex flex-col items-center gap-10 mt-20">
      <Link href="/recipes-server">Geri</Link>

      <Image src={recipe.image} alt={recipe.name} width={250} height={250} className="rounded-md" />

      <h1>{recipe.name}</h1>
      <h1>Mutfak: {recipe.cuisine}</h1>
      <h1>Rayting: {recipe.rating}</h1>
      <h1>Zorluk: {recipe.difficulty}</h1>
    </div>
  );
};

export default Page;
