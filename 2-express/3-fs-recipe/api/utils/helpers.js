import fs from "fs";

// json dosyyasının içeriğini alıp js formatına çevirip döndüren fn
const readData = () => {
  try {
    const jsonData = fs.readFileSync("./data/db.json", "utf-8");

    const jsData = JSON.parse(jsonData);

    return jsData;
  } catch (error) {
    console.log(error);
  }
};

// veriyi parametre olarak alıp json formatına çevirip json dosyasını güncelleyen fn
const writeData = (data) => {
  try {
    fs.writeFileSync("./data/db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// tarif nesnesindeki bütün değişkenler tanımlımı kontrol eden fonk
// eğer nesnedeki zorunlu bütün alanlar tanımlıysa true döndürmeli
// bir alan bile tanımsız ise false döndürmeli
const requiredFields = ["name", "category", "ingredients", "time", "instructions", "serving", "difficulty", "country"];

const isValid = (body) => {
  // eksik bir alan var mı kontrol et
  return requiredFields.every((field) => body[field]);
};

// body bölümünde client'ın gönderdiği extra verileri temizle
const filterBody = (body) => {
  return Object.fromEntries(Object.entries(body).filter(([key]) => requiredFields.includes(key)));
};

export { readData, writeData, isValid, filterBody };
