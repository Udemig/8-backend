const fs = require("fs");

const handleGet = (req, res) => {
  // url'den id değerini al
  const id = req.url.split("/")[2];

  // get-all isteği atıldıysa ve url'de id yoksa
  if (req.url === "/movies") {
    // json dosyasındaki içeriğe eriş
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    // client'a filmleri gönder
    return res.end(movies);
  }

  // get-one isteği /movies endpointine atıldıysa ve url'de id varsa
  if (id) {
    // json dosyasındaki içeriğe eriş ve javascript formatına çevir
    const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // urle parametre olarak eklenen id'li filmi bul
    const movie = movies.find((movie) => movie.id === id);

    // film bulunamadıysa hata döndür
    if (!movie) {
      res.writeHead(404);
      return res.end(
        JSON.stringify({
          success: false,
          message: "Aradığınız film bulunamadı",
        })
      );
    }

    // film verisini client'a gönder
    return res.end(JSON.stringify(movie));
  }
};

module.exports = handleGet;
