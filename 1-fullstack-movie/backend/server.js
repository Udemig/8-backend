const http = require("http");
const handleGet = require("./methods/handle-get");
const handlePost = require("./methods/handle-post");
const handlePut = require("./methods/handle-put");
const handleDelete = require("./methods/handle-delete");
const handleDefault = require("./methods/handle-default");
const handleOptions = require("./methods/handle-options");

// 1) sunucuyu oluştur
const server = http.createServer((req, res) => {
  console.log(`Gelen İstek: method: ${req.method} | url: ${req.url}`);

  // istek /movies adresine atılmadıysa 404 döndür
  if (!req.url.includes("/movies")) return handleDefault(req, res);

  // cors hatalarını engellemek için gerekli header (GET)
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    case "POST":
      return handlePost(req, res);

    case "PUT":
      return handlePut(req, res);

    case "DELETE":
      return handleDelete(req, res);

    case "OPTIONS":
      return handleOptions(req, res);

    default:
      return handleDefault(req, res);
  }
});

// 2) oluştruduğumuz sunucnun dinleyeceği portu belirle
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT}. portu dinlemeye başladı`);
});
