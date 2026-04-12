import { fetchRecipes } from "@/utils/api";
import Image from "next/image";

const RecipesServer = async () => {
  const { recipes } = await fetchRecipes();

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Tarifler</h1>

      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex gap-4 mt-5 p-4 rounded-md border">
          <Image src={recipe.image} alt={recipe.name} width={100} height={100} />

          <div>
            <h1>{recipe.name}</h1>
            <h2>{recipe.cusine}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesServer;
