import { fetchRecipes } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

// statik olan bu sayfayı tamamen dinamik hale çevirir (borsa|crypto|mesajlaşma)
// export const dynamic = "force-dynamic";

// statik sayfa içeriğini belirli aralıklara yeniden oluşturulmasını sağlar
// sayfa içeriğinin nadirde olsa güncellendiği sayfalarda kullanırız
export const revalidate = 300;

const RecipesServer = async () => {
  const { recipes } = await fetchRecipes();

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Tarifler</h1>

      {recipes.map((recipe) => (
        <Link href={`/recipes-server/${recipe.id}`} key={recipe.id} className="flex gap-4 mt-5 p-4 rounded-md border">
          <Image src={recipe.image} alt={recipe.name} width={100} height={100} className="rounded-md" />

          <div>
            <h1>{recipe.name}</h1>
            <h2>{recipe.cusine}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipesServer;
