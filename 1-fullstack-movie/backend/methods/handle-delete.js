const fs = require("fs");

const handleDelete = (req, res) => {
  // url'deki id parametresine eriş
  const id = req.url.split("/")[2];

  // id yoksa hata fırlat
  if (!id) {
    res.writeHead(404);
    return res.end(JSON.stringify({ success: false, message: "Id tanımlanmamış" }));
  }

  // json dosyasından verileri al
  const movies = JSON.parse(fs.readFileSync("./data/movies.json"), "utf-8");

  // tanımlanan id'li movie dizi içerisinde var mı kontrol et
  const movie = movies.find((movie) => movie.id === id);

  // movie yoksa hata fırlat
  if (!movie) {
    res.writeHead(404);
    return res.end(JSON.stringify({ success: false, message: "Silmek istediğiniz film bulunamadı" }));
  }

  // silinmesi istenen movie'yi diziden kaldır
  const filtred = movies.filter((movie) => movie.id !== id);

  // json dosyasını güncelle
  fs.writeFileSync("./data/movies.json", JSON.stringify(filtred), "utf-8");

  // client'a cevap gönder
  res.writeHead(204);
  return res.end();
};

module.exports = handleDelete;
