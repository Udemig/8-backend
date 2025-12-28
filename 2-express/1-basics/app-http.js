const http = require("http");
const URL = require("url");

const server = http.createServer((req, res) => {
  // "/users" adresine atılan "get" isteklerine cevap ver
  const parsedUrl = URL.parse(req.url, true);

  if (parsedUrl.pathname === "/users" && req.method == "GET") {
    res.writeHead(200);
    return res.end(JSON.stringify({ message: "Kullanıcılar alındı", queryParam: parsedUrl.query }));
  }

  // "/users" adresine atılan "post" isteklerine cevap ver
  if (req.url === "/users" && req.method == "POST") {
    res.writeHead(201);
    return res.end(JSON.stringify({ message: "Kullanıcı oluşturuldu" }));
  }

  // url'i parçalarına ayır
  const path = req.url.split("/")[1];
  const id = req.url.split("/")[2];

  // "/users/id" adresine delete isteği atılınca cevap ver
  if (path === "users" && id) {
    return res.end(JSON.stringify({ message: "Kullanıcı silindi", id }));
  }

  // tanımlanmayan bir adrese istek atılırsa 404 cevabı gönder
  res.writeHead(404);
  return res.end(JSON.stringify({ message: "Aradığınız adres bulunamadı" }));
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Sunucu ${PORT} purtunda çalışıyor`));

// İsteğin body bölümündeki veriye erişmemizi sağlar
const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // client'dan gelen veriyi tuttuğumuz değişken
      let body = "";

      // client'tan her body parçası (chunk) geldiğinde elimizdeki body değişkenine ekle
      req.on("data", (chunk) => {
        // body'nin devamına gelen chunk'ı ekle
        body += chunk;
      });

      // aktarma işlemi bittiğinde json versini js'e çevir
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = bodyParser;
