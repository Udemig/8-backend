// AppError - Status Code Taşıyon Özel Hata Sınıfı
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, status = 500) {
    super(message);
    this.statusCode = status;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
