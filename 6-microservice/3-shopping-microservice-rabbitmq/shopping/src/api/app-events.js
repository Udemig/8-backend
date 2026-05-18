const ShoppingService = require("../services/shopping-service");

// Microservis mimarisinde servisler arasında iletişim gereken durumlar olabilir
// Bu durumda farklı servislerden gelen api isteklerinin body kısmına bağlı olarak gerekli işlemleri yapabiliriz

module.exports = (app) => {
  app.use("/app-events", async (req, res) => {
    // customerService'deki fonksiyonları kullanabilmek için örnek al
    const service = new ShoppingService();

    // isteğin body içerisinde gelen payload verisine eriş
    const { payload } = req.body;

    // diğer servislerden gelen habere göre gerekli fonksiyonları çalıştır
    await service.SubscribeEvents(payload);

    console.log("============ shopping servise haber geldi ===============================", payload);

    // haber gönderen servise haberi aldığımızı söyle
    res.status(200).json({ message: "Webhook mesajı alındı" });
  });
};
