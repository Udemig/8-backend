import type { Request, Response, NextFunction } from "express";
import { AppError } from "./utils/app-error.js";

//* Error Middleware
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Bir şeyler ters gitti...";

  if (statusCode >= 500) {
    console.error("[ERROR]", err);
  } else {
    console.log("[ERROR]", message);
  }

  res.status(200).json({ status: "error", message });
};

//* 404 Middleware
export const notFoundMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: "error", message: "İstek attığınız adres bulunamadı" });
};
