import { isDevelopment } from "../config/enviroment.js";
import { BaseError } from "../utils/errors.js";
const errorHandler = (err, req, res, next) => {
    // bilinmeyen hata meydan geldiğinde
    if (!(err instanceof BaseError)) {
        console.log("❌ Bilinmeyen Hata", err);
        err = new BaseError("Beklenmeyen bir hata oluştu", 500, "INTERNAL_SERVER_ERROR");
    }
    // gönderilecek yanıtı hazırla
    const response = {
        status: "error",
        message: err.message,
        code: err.errorCode,
    };
    // geliştirme modundaysak hataya stack bilgisini ekle
    if (isDevelopment) {
        response.stack = err.stack;
    }
    // client'a cevap gönder
    res.status(err.statusCode).json(response);
};
export default errorHandler;
//# sourceMappingURL=error-handler.js.map