const handleOptions = (req, res) => {
  // Frontend bir post/put/patch/delete isteği atmadan önce bu isteğin kabul edilip edilmediğiniz kontrol etmek için bir OPTIONS isteği atar

  // OPTIONS'a backendden yanıt göndermezsek, frontend  istek türünün kabul edilmeyeciğini düşünürek asıl isteği göndermez

  // Eğer OPTIONS'A doğru header'larla yanıt gönderirsek frontend asıl isteği gönderir

  //* hangi isteklere izin verdiğimizi söyleyelim
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  //* body'e sahip isteklerde hangi formatta veri göndericeğini belirleyen header'a izin ver
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //* 200 olumlu yanıtı gönder
  res.end();
};

module.exports = handleOptions;
