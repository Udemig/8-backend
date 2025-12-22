const bodyParser = require("../utils/body-parser");
const validateData = require("../utils/validate-data");
const crypto = require("crypto");
const fs = require("fs");

const handlePost = async (req, res) => {
  // isteğin body bölümünde gelen içeriğe erişmemi sağlayacak fonksiyon
  const body = await bodyParser(req);

  // body'de eksik alan varsa hata fırlat
  validateData(body, res);

  // kaydediceğimiz veriye id ekle
  body.id = crypto.randomUUID();

  // json dosyasının içeriğini al (js formatına çevir)
  let data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

  // yeni filmi diziye ekle
  data.push(body);

  // json dosyasını güncelle
  fs.writeFileSync("./data/movies.json", JSON.stringify(data), "utf-8");

  // client'a cevap gönder
  res.writeHead(201);
  return res.end(JSON.stringify(body));
};

module.exports = handlePost;
