# Routing (Yönlendirme)

- Bir URL ve HTTP methoduna gelen isteğin, hangi kodu çalıştıracağını belirleme işlemi

# Express

- Node.js üzeirnde çalışan bir routing framework'ü.
- API yazmayı çok daha kolay hale getirir.

- Neden Express'e İhtiyaç Var?
- Nodejs'in kendi `http` modülü ile sunucu yazmak mümkün ama:
- - Routing (yönlendirme) zordur
- - Middleware (arayazılım) mantığı yoktur.
- - Kod çok hızlı karmaşıklaşır
- - - Express bu problemleri çözer

# Middleware

- İstek ile cevap arasına giren ve bu akışı kontrol eden ara fonksiyonlardır.

- İstek Gelir ------> middleware çalışır -------> (next varsa) sonraki adıma geçir -----------> response döner

- Middleware'ler neler yapabilir?

* req ve res nesnelerine erişebilir değiştirebilir
* isteği sonlandırabilir (response döndebilir)
* bir sonraki adıma geçebilir (next)
* hata yakalabilir

- En sık kullanılan middleware Örnekleri

* Body Parsing (Body ile gelen veriye erişmek için)
* Yetkilendirme: İstek atan kullanıncının yetkisi var mı kontrol ederiz
* Hata yakalama
* CORS sorununu çözmek

## Next

- Express middlewarelerinde kullanılur
- "bu iş bitti, sıradaki middleware'e / route'a geç"

# CORS

- Cross-Origin Resource Sharing
- www.frontend.com -----------> www.api.backend.com

- Bir websitenin başka bir domainden API isteği atmasına izin verilip verilmeyceğini belirleyen tarayıcı güvenlik mekanizmasınıdır.

- Tarayıcı: "Bu frontend, bu backend'e istek atabilir mi?" diye kontrol

## Terimler

- Get: Getir
- Post: Oluştur
- Put: Tamamen Güncelle
- Patch: Kısmi Güncelle
- Delete: sİL
- Req (Request): İstek
- Res (Response): Yanıt
- Query: Url'deki ? parametreler
- Params: Urldeki değişkenler
- Body: Gönderilen Veri
- Headers: Header bilgileri (token.)
- Cookies: Çerezler
- Status: Durum (404)
- Middleware: Arayazılım
- Routing: Yönlendirme
