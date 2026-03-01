import { isDevelopment } from "../config/enviroment.js";
import { BaseError } from "../utils/errors.js";
import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "./../types/index.js";

const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  // bilinmeyen hata meydan geldiğinde
  if (!(err instanceof BaseError)) {
    console.log("❌ Bilinmeyen Hata");

    err = new BaseError("Beklenmeyen bir hata oluştu", 500, "INTERNAL_SERVER_ERROR");
  }

  // gönderilecek yanıtı hazırla
  const response: ErrorResponse = {
    status: "error",
    message: err.message,
    code: err.errorCode,
  };

  // geliştirme modundaysak hataya stack bilgisini ekle
  if (isDevelopment) {
    response.stack = err.stack as string;
  }

  // client'a cevap gönder
  res.status(err.statusCode).json(response);
};

export default errorHandler;
