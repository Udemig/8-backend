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

export { readData, writeData };
