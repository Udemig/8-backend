// -------- Authorization Middleware ---------
// * Client'ın gönderdiği token'ın geçerliğini doğruylayıp:
// * Token geçersiz ise route'a erişimine izin vermeyip hata fırlat
// * Token geçerliyse route'a erişmesine izin ver

export const protect = (req, res, next) => {
  // 1) çerezler ile gelen tokeni al (çerez veya header)
  let token = req.cookies.jwt; // oturumu kapalıysa: undefined | açıksa: eyJhbGciOiJIUzI1NiIsInR5cCI...

  // token gelmediyse hata fırlat

  // token'ın geçerliliğini doğrula (zaman aşımına uğradımı | imza doğru mu)

  // token'ın ile gelen kullanıcnın hesabı duruyor mu

  // hesap silindiyse hata fırlat

  // hesap dondurulduysa hata fırlat

  // kullanıcıya tokenı verdikten sonra şifresini sıfırlamış mı

  // sonraki adıma geç
  next();
};
