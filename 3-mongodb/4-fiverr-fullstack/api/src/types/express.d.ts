import type { UserType } from "./index.ts";

// express içerisindeki Request interface'inin tipini güncelle
declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}
