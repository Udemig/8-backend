import jwt from "jsonwebtoken";
import { config } from "../config/enviroment.js";
import { Forbidden } from "../utils/errors.js";
import User from "../models/user.model.js";
// Client'dan gelen JWT tokenı üzerinden kullanıcının kimliğini doğrulayacak middleware
// Eğer token geçerliyse sonraki adıma geçmeye izin verilmeli
// Eğer token geçersizse yetkilendirme hatası fırlatılmalı
const protect = async (req, res, next) => {
    // çerezler'le gelen token'a eriş
    const token = req.cookies.token;
    // token yoksa hata ver
    if (!token)
        return next(new Forbidden());
    // token varsa geçerli mi kontrol et
    let payload;
    try {
        payload = jwt.verify(token, config.JWT_SECRET);
    }
    catch (error) {
        throw new Forbidden();
    }
    // token geçerliyse kullanıcı hesabını veritabanında ara
    const user = await User.findById(payload.id);
    // kullanıcı hesabı silindiyse
    if (!user)
        return next(new Forbidden("Bu hesap artık kullanım dışı"));
    // kullanıcı bilgilerini bu mw'den sonra çalışıcak fonksiyona aktar
    req.user = user;
    // sonraki adıma devam et
    next();
};
export default protect;
//# sourceMappingURL=protect.js.map