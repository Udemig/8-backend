import { readData, isValid, writeData, filterBody } from "../utils/helpers.js";
import crypto from "crypto";

const data = readData();

const getAllRecipes = (req, res) => {
  // tarif verisinin kopyasını oluştur
  let recipes = [...data]; // spread (...)

  // isteğin query bölümünde gelen arama parametresine eriş
  const search = req.query?.search?.toLowerCase();

  // eğer search parametresi geldiyse fitlreme yap
  if (search) {
    recipes = data.filter((i) => i.name.toLowerCase().includes(search));
  }

  // eğer order parametresi varsa sıralama yap
  // asc: ascending : artan
  // desc: descending : azalan
  if (req.query.order) {
    recipes.sort((a, b) => (req.query.order === "asc" ? a.time - b.time : b.time - a.time));
  }

  // client'a cevap gönder
  res.json({ message: "Bütün tarifler listelendi", results: recipes.length, data: recipes });
};

const getOneRecipe = (req, res) => {
  // parametre olarak gelen id'li tarifi dizide ara
  const found = data.find((i) => i.id === req.params.id);

  // tarif bulunamadıysa hata fırlat
  if (!found) {
    return res.status(404).json({ message: "Aradığını tarif bulunamadı" });
  }

  // client'a cevap gönder
  res.json({ message: "Tarif bulundu", data: found });
};

const createRecipe = (req, res) => {
  // frontend'den gelen veriyi fitrle
  const filtredBody = filterBody(req.body);

  // verinin formatı doğru mu kontrol et
  if (!isValid(filtredBody)) {
    return res.status(400).json({ message: "Gönderdiğiniz veri eksik" });
  }

  // veriye id ve foto ekle
  const newRecipe = {
    ...filtredBody,
    id: crypto.randomUUID(), //
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  // yeni tarifi tarifler dizisine ekle
  data.push(newRecipe);

  // json dosyasını güncelle
  writeData(data);

  // client'a cevap gönder
  res.status(201).json({ message: "Tarif oluşturuldu", data: newRecipe });
};

const updateRecipe = (req, res) => {
  // parametre olarak gelen id'ye sahip tarifi bul
  const found = data.find((i) => i.id === req.params.id);

  // tarif bulunamadıysa hata fırlat
  if (!found) {
    return res.status(404).json({ message: "Güncellemek istediğiniz tarif bulunamadı" });
  }

  // body'de gelen extra verileri temizle
  const filtredBody = filterBody(req.body);

  // body bölümünde gelen verilerde eksik varsa hata fırlat
  if (!isValid(filtredBody)) {
    return res.status(400).json({ message: "Tarif verini eksik gönderdiniz" });
  }

  // güncellenicek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  // diziyi güncelle
  data.splice(index, 1, { ...found, ...filtredBody });

  // json dosyasını güncelle
  writeData(data);

  // client'a cevap gönder
  res.json({ message: "Tarif güncellendi", data: { ...found, ...filtredBody } });
};

const deleteRecipe = (req, res) => {
  // parametre olarak gelen id'li elemanı dizide ara
  const found = data.find((i) => i.id === req.params.id);

  // tarif bulunamadıysa hata fırlat
  if (!found) return res.status(404).json({ message: "Silmek istediğiniz tarif bulunamadı" });

  // dizideki elemanın sırasın bul
  const index = data.findIndex((i) => i.id === req.params.id);

  // diziden tarifi kaldır
  data.splice(index, 1);

  // json dosyasını güncelle
  writeData(data);

  // client'a cevap gönder
  res.json({ message: "Tarif kaldırıldı" });
};

export { getAllRecipes, getOneRecipe, createRecipe, updateRecipe, deleteRecipe };
