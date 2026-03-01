// Temel hata sını
export class BaseError extends Error {
  statusCode;
  errorCode;
  isOperational;

  constructor(message: string, statusCode: number, errorCode: string) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Yanlış / Eksik İstek Hatası
export class BadRequest extends BaseError {
  constructor(message = "Geçersiz / Eksik istek") {
    super(message, 400, "BAD_REQUEST");
  }
}

// Kimlik Doğrulanamama Hatası
export class Unauthorized extends BaseError {
  constructor(message = "Kimlik doğrulanamadı") {
    super(message, 401, "UNAUTHORIZED");
  }
}

// Yetki Olmamama Hatası
export class Forbidden extends BaseError {
  constructor(message = "Bu işlem için yetkiniz yok") {
    super(message, 403, "FORBIDDEN");
  }
}

// İçerik bulunamama Hatası
export class NotFound extends BaseError {
  constructor(message = "Kaynak bulunamadı") {
    super(message, 404, "NOT_FOUND");
  }
}
