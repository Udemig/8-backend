import type { RequestHandler } from "express";
import type { RouteParams } from "../types/index.js";

// Çalıştıdığı fonksiyonda hata olursa error middleware'ine yönlendiren fonksiyon
const catchAsync = (fn: RouteParams): RequestHandler => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

export default catchAsync;
