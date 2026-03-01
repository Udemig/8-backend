import type { Request, Response, NextFunction } from "express";

// Controller fonksiyonlarının hepsinde tekrar tekrar try catch yazmak zorunda kalmamak için controller fonksiyonunu parametre olarak olarak alan onun yerine hata durumlarında hatayı yakalayıp global hata middleware'ine yönlendiren yardımcı fonksiyon

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (fn: AsyncController) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
