const bodyParser = require("../utils/body-parser");
const validateData = require("../utils/validate-data");
const fs = require("fs");

const handlePut = async (req, res) => {
  // url'deki id parametresine eriş
  const id = req.url.split("/")[2];

  // isteği body bölümündeki veriye eriş
  const body = await bodyParser(req);

  // body kısımındaki veride eksik bir alan var mı kontrol et
  validateData(body, res);

  // json dosyasındaki içeriği al
  const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

  // güncellenicek elemanın dizideki sırasını bul
  const index = movies.findIndex((movie) => movie.id === id);

  // dizideki ilgili elemanı güncelle
  movies[index] = {
    ...body,
    id,
  };

  // json dosyasını güncelle
  fs.writeFileSync("./data/movies.json", JSON.stringify(movies), "utf-8");

  // client'a cevap gönder
  return res.end(JSON.stringify(movies[index]));
};

module.exports = handlePut;
