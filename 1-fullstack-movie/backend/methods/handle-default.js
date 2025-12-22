const handleDefault = (req, res) => {
  // yanıtın durum kodunu belirle
  res.statusCode = 404;

  // yanıtın içeriğini belirle
  res.write(
    JSON.stringify({
      success: false,
      message: "İstek attığınız endpoint mevcut değil",
    })
  );

  // client'a yanıtı gönder
  return res.end();
};

module.exports = handleDefault;
