const getAllRecipes = (req, res) => {
  res.json({ message: "Bütün tarifler listelendi" });
};

const getOneRecipe = (req, res) => {
  res.json({ message: "Tarif bulundu" });
};

const createRecipe = (req, res) => {
  res.json({ message: "Tarif oluşturuldu" });
};

const updateRecipe = (req, res) => {
  res.json({ message: "Tarif güncellendi" });
};

const deleteRecipe = (req, res) => {
  res.json({ message: "Tarif kaldırıldı" });
};

export { getAllRecipes, getOneRecipe, createRecipe, updateRecipe, deleteRecipe };
