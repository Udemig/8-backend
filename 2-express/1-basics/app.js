const express = require("express");

// bir api oluştur
const app = express();

// isteğibn body bölümü ile gelen veriye erişmemizi sğalayan middleware
app.use(express.json());

// "/users" adresine atılan "get" isteklerine cevap ver
// req.query: istek ile gelen arama parametrelerine erişmemizi sağlar
app.get("/users", (req, res) => {
  res.json({ message: "Kullanıcılar alındı", queryParams: req.query });
});

// "/users" adresine atılan "post" isteklerine cevap ver
app.post("/users", (req, res) => {
  res.status(201).json({ message: "Kullanıcı oluşturuldu", body: req.body });
});

// "/users/id" adresine atılan "delete isteğine cevap ver"
// req.params: istek ile gelen parametrele erişmemizi sağlar
app.delete("/users/:id", (req, res) => {
  res.json({ message: "Kullanıcı silindi", id: req.params.id });
});

// tanımlanmayan bir adrese istek atılırsa 404 cevabı gönder
app.use((req, res) => {
  res.status(404).json({ message: "Adres bulunamadı" });
});

// hangi portta sunucu çalışıcak
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı`);
});
