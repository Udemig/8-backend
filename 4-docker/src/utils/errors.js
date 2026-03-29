// Temel hata sınıfı
// Message / Hata Kodu gibi bilgileri alıcak
// Diğer bütün hata sınıfları bu sınıftan türeyecek
export class BaseError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// HTTP Hatası
export class BadRequest extends BaseError {
  constructor(message = "Geçersiz istek") {
    super(message, 400, "BAD_REQUEST");
  }
}

// Kimlik Doğrulanamadı Hatası
// Ben senin kim olduğunu bilmiyorum durumu
export class Unauthorized extends BaseError {
  constructor(message = "Yetkisiz erişim") {
    super(message, 401, "UNAUTHORIZED");
  }
}

// Kimlik doğrulandı ama Yetkin Yok Hatası
// Kim olduğunu biliyorum ama izin vermiyorum durumu
export class Forbidden extends BaseError {
  constructor(message = "Bu işlem için yetkiniz yok") {
    super(message, 403, "FORBIDDEN");
  }
}

// Bulunamadı Hatası
export class NotFound extends BaseError {
  constructor(message = "Kaynak bulunamadı") {
    super(message, 404, "NOT_FOUND");
  }
}
