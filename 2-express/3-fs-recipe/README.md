# Recipe Projesi

- Projeden beklnetimiz kullanıcnın tarif verilieri üzerinde CRUD işlemleri ve ek olarak filtreleme sıralama gibi özellikleri gerçekleştirebilmesi.

## Backend Tarafında Tanımlanması Gerekli Endpointler

- `GET` `/api/recipes` > bütün tarfileri alma
- bu endpointe gönderilecek query params ile filtreme ve sıralama yapılabilecek
- ?search=makarna&order=asc

- `GET` `/api/recipes/:id` > tarif detayını alma

- `POST` `/api/recipes` > tarif oluşturma
- body bölümünde gelen verinin formatını kontrol et

- `PATCH` `/api/recipes/:id` > tarifi güncelle
- body bölümünde gelen verinin formatını kontrol et

- `DELETE` `/api/recipes/:id` > tarifi kaldır

# Backend Kütüphaneler

- express
- nodemon
- cors

# Commonjs vs Module

```jsx
//  import
const express = require("express");

//  export default
module.exports = "furkan";

//  export
exports.name = "ali";

//----------------------------------------

//  import
import express from "express";

//  export default
export default "furkan";

//  export
export const name = "ali";
```

# Route Tanımlama Yöntemleri

```js
// Amaç: api'ın endpointlerini ve istek gelince çalışıcak fonksiyonlarını belirle

// ----------------------------- 1. yol -----------------------------------
// endpointleri ayrı ayrı tanımlama
router.get("/api/recipes", getAllRecipes);
router.post("/api/recipes", createRecipe);

router.get("/api/recipes/:id", getOneRecipe);
router.patch("/api/recipes/:id", updateRecipe);
router.delete("/api/recipes/:id", deleteRecipe);

// ----------------------------- 2. yol -----------------------------------
// router.route aracılığıyla aynı endpointe sahip olan istek türlerini tek noktada tanımlıyoruz
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getOneRecipe).patch(updateRecipe).delete(deleteRecipe);
```
