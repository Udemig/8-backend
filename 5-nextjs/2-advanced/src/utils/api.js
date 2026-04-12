export const fetchRecipes = async () => {
  const res = await fetch("https://dummyjson.com/recipes", {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
};
