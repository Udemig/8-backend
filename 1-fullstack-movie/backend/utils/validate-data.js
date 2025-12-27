// client'dan body'de beklediğimiz alanlar
const keys = ["title", "year", "genre", "rating", "description", "duration", "cast", "language", "director", "image"];

const validateData = (body, res) => {
  // client'dan gelen veride eksik bir alan var mı kontrol et
  const missingFields = keys.filter((key) => !body[key]);

  // body'de eksik alan varsa hata fırlat
  if (missingFields.length > 0) {
    res.writeHead(400);
    return res.end(
      JSON.stringify({
        success: false,
        message: "Gönderdiğiniz bilgiler eksik",
        missingFields,
      })
    );
  }
};

module.exports = validateData;
