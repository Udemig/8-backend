import { BaseError } from "../utils/errors.js";

const errorHandler = (err, req, res, next) => {
  // Bilinmeyen hatalarda varsayılan mesaj tanımla
  if (!(err instanceof BaseError)) {
    console.log("❌ BİLİNMEYEN HATA:", err);

    err = new BaseError("Beklenmeyen bir hata oluştu", 500, "INTERNAL_SERVER_ERROR");
  }

  // gönderilecek cevabı hazırla
  const response = {
    status: "error",
    message: err.message,
    code: err.errorCode,
  };

  // geliştirme ortamındaysak hatanın extra detaylarını cevaba dahil et
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  // client'a cevap gönder
  res.status(err.statusCode).json(response);
};

export default errorHandler;
