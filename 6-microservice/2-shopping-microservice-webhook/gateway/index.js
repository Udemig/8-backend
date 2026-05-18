const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

//* Client tarafı istek atarken sürekli farklı portlara istek atamasının önüne geçemek için proxy kullanıyoruz
//* Proxy client'ten gelen isteği farklı sunuculara yönlendirmemizi sağlayan ara birim.
app.use("/customer", proxy("http://localhost:3002"));
app.use("/shopping", proxy("http://localhost:3003"));
app.use("/", proxy("http://localhost:3001"));

app.listen(3000, () => {
  console.log("Gateway Service 3000 portunda çalışıyor");
});
