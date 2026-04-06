# Routing

- Next.js'de güncel sürümünde önerilen routing yöntemi `App Router`'dır ama next.js'in 13 sürümü öncesinde `Pages Router` kullanılır.

# App Router

- React projelerindeki react-router-dom kütüphanesiyle yaptığımız sayfalamayı next.js de next'in kendine has app router yöntemiyle yaparız
- Dosya dizinine göre / klasör tabanlı sayfalama yapılır
- Bir sayfa oluşturmak için app klasörü içerisinde o sayfanın adına sahip bir klasör oluşturmalıyız
- Oluşturduğumuz klasör içerisinde `page.jsx` dosyası oluşturulmalı
- `page.jsx` dosyası içerisinden bir react bileşeni export edilmeli
- Next.js bu sayfayı otomatik olarak tespit eder.

# Nested Routes

- İç İçe Yollar
- örn:
- /profile > profilini görüntüle
- /profile/friends > arakadaşlarını görüntüle
- /profile/edit > profilini düzenle

# Link

- Next.js de kullanıcıyı linkler aracılığıyla yönlendirmek için Link bileşenini kullanırız
- `href` propu ile yönlderime adresini tanımlarız

# Dynamic Routes

- Dinamik Yollar
- Url'deki parametrelere göre içeriği değişen detay sayfalarını tanılma yöntemidir
- /products/10 | /videoes/mdfskj324 | /cars/m4
- Bir dinamik route tanımlamak için klasör oluştururken ismini [] içerisinde yazarız
- Component ise bu parametreye props aracılığı ile erişir

- /products/1
- /products/2
- /products/3
- `/products/[id]`

# Catch All Segments

- Birden fazla parametreyi tanımlama
- Bir route'da birden fazla parametre olduğunda bu yöntemi kullanırız.
- Bu yöntemde parametre sayısı birden fazla olduğu için parametreler hep dizi olarak gelir

- /docs
- /docs/belge-1
- /docs/belge-1/sayfa-4
- /docs/belge-1/sayfa-4/satir-20
- `/docs/[...slug]`

# Not Found

- 404 Sayfası
- Bir 404 sayfası oluşturmak için tek yapmamız gereken app klasörü içerisinde `not-found.jsx` isimli bir dosya oluştumalıyız
- Next.js'in varsayılan bir 404 sayfası var ama istersek bu sayfayı özelleştirebiliriz
- Kullanıcı, proejede bulunmayan bir adresi ziyaret ettiğinde otomaik olarak devreye girer
- `notFound()` fonksiyonu ile istediğiniz zaman 404 bileşenini ekrana basabilirsiniz

# Route Group

- Sayfa Gruplandırma, proje içerisinde sayfaların daha erişilebilir olması için kategorilerine göre gruplandırma işlemidir.
- Ortak layout'a sahip olucak sayfaları aynı route grubu içerisinde almak isteyebiliriz
- Normal klasörler url'i etkileyeceği için sayfaları gruplandırıken normal klasör kullanmayı tercih etmeyiz

- /auth/register > auth ismi url'e etki eder
- /(auth)/register > auth ismi url'e etki etmez

# Layout

- Bir uygulamanın veya sayfa grubunun genel dizaynını / ortak elementlerini / yetkilendirme durumunu belirlemek için kullandığımız bileşendir.

- Bir sayfa grubunun veya projedeki bütün sayfaların ortak kullanıcağı bileşenleri layout içerisinde tanımlayıp kod tekrarını önleyebiliriz

- Layout, oluşturduğumuz konuma bağlı olarak etki ediceği sayfalar değişir
- Eğer app klasörü içerisinde oluşturursak bütün sayfalara etki eder
- Eğer bir route grubu içerisinde oluşturursak sadece o route grubundaki sayfalara etki eder

- Layout bileşenleri, ekrana basılacak olan sayfaları children propu olarak alır bundan dolayı layout'lar birer HOC (Higher Order Component) türündedir
- Dosya ismi mutlaka `layout.jsx` olmalıdır

# Template

- Layout ile aynı özelliklere sahiptir.
- Sadece sayfa geçişlerinde state sıfırlanır

# Metadata

- Next.js'de react'dan farklı olarak her sayfaya özgü ayrı metadalar tanımlanabilir
- Bu sayede next.js projeler `SEO` açısından react'a göre çok daha iyi olur
- Sayfaların tarayıcıda öne çıkması için tanımladığımız meta özelliklerini (title,description,keywords) react tarafında bütün sayfalara ortak şeklide tanımlabilirken next.js'de her sayfaya ayrı bir metada tanımlanabiliyor
- Bir sayfanın metadatasını tanımlamak için o sayfa içerisinden `metadata nesnesi` export etmeliyiz
- `generateMetadata` fonksiyonu sayfanın parametrelerini prop olarak alır bu sayede ürün bilgilerine göre metadata dinamik olarak belirlenebilir

# Özel Dosyalar

- `page.jsx` > sayfa tanımlar
- `layout.jsx` > sayfa düzeni tanımlar
- `template.jsx` > sayfa düzeni tanımlar
- `not-found.jsx` > 404 sayfası tanımlar

- `loading.jsx`
- - Bir bileşen içerisinden api isteği atıldığında api'dan cevap gelene kadar otomatik olarak ekrana gelen bir bileşendir.
- - Bileşen, await ile promise'in sonuçlanmasını beklediği süre boyunca ekrana gelir
- - loading doyasını oluşturduğumuz klasör bileşenin hangi sayfalara etki ediceğini belirler
- - loading bileşeni, layout içerisinde children nerede ekrana basıldıysa orada renderlanır

- `error.jsx`
- - Bir bileşen içerisinden api isteği atıldığında api'dan hata cevabı gelirse otomatik olarak ekrana gelen bir bileşendir.
- - Bileşende hata meydana geldiği zaman ekrana gelir
- - error doyasını oluşturduğumuz klasör bileşenin hangi sayfalara etki ediceğini belirler
- - error bileşeni, layout içerisinde children nerede ekrana basıldıysa orada renderlanır
- - hata bilgisini ve bileşeni yeniden renderlama fonksiyonunu prop olarak alır

# Import

- Bir içeriği import ederken next.js'de 2 farklı yöntem bulunur

## Relative Import

- import ediceğimiz dosyaya bulunduğumuz dosyanın konumuna göre `../../` ifadesiyle erişir

## Absolute Import

- bir dosyayı iöport ederken bulunduğumuz dosyanın konumu önemsizdir
- `@/` buradaki @ işareti sayesinde src klasörünü baz alırız
- bu sayede iöport ederken src klasöründen itibaren import ederiz ve bulunuduğumu dosyanın konumunun bir önemi kalmaz
- bu yöntemde dosya konumunu değiştirseniz daha import yolu aynı kalır
