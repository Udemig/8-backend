# Image

- Next.js'de resimleri image componentıyla ekrana basarsak, next.js resmi renderlamadan önce bir çok optimizasyondan geçirir, boyutunu düşürür, formatına webe uygun hale getirir ve ekrana basar
- Bu optimizasyon sayesinde resim içerikleri daha hızlı ekrana gelirken bununla birlikte SEO'da olumlu yönde etkilenir

# Parallel Routes

- Parallel Routes, aynı anda birden fazla bağımsız sayfayı aynı layout içerisine ekrana basmaya yarar
- Her sayfa kendi bağımsız yüklenme mantığına sahip olur (loading.jsx özelliği)
- @Slot: @ işaret ile tanımlanan ve parallel route olarak ekrana basılan sayfalardır
- Slot olarak tanımlanan sayfalar layout'a prop olarak gider.
- Layout üzerinden slot olarak tanımlanan sayfaları aynı anda veya koşullu olaraka ekrana basabiliriz

# Intercepting Routes

- Önizlemeli Routelar
- Bir sayfaya yönlendiren linke tıkladığımızda öncelikle bir modal açıp yönlendirceğimiz sayfanın detaylarını modal üzerinden gösteririrz. Kullanıcı sayfayı yeniler veya url üzeirnden ziyaret ederse modal yerine sayfanın kendisini görür.
- Bu özellik genel olarak ürün detay veya login,register sayfalarında daha akıcı bir kullanıcı deneyimi için kullanılır

# Server Side Rendering vs Client Side Rendering

- Client side rendering yöntemi uygulanan bir sayfaya girdiğinizde `js kodu` ve `boş html dosyası` indirirsiniz. İndilen js `kullanıcının cihazında` çalışır, html içeriğini doldurur ardından sayfa ekrana gelir

- Server side rendering yöntemi uygulanan bir sayfaya girdğinizde `js kodu`, `sunucuda` çalışır ve `html kodu sunucuda oluşur`. Oluşan `dolu html dosyasını` client indirir ve sayfa ekrana gelir

## SSR Faydaları

- JS kodu kullanıcnın cihazında değilde sunucuda çalışıyor olması daha hızlı sonuç üretir ve daha kısa yüklenme süresi olur
- SEO açısınan dolu html dosyası indirmek çok daha iyidir, bu sayede google'ın robotlaro sayfa içeriğini boş zannedip sitemizi arama sonuçlarında alt sıralara atmaz

## Nasıl SSR veya CSR kullanırız?

- Next.js'de iki farklı component türü vardır:
- Server component: İçeriği server'da render edilir
- Client component: İçeriği client'da render edilir

- Next.js biz aksini belirtmedikçe bütün component'ları `server component` yapar
- Eğer bileşenin üst kısmına `use client` yazarsak `client component` olur

- Next.js bizden olabildiğince fazla server component kullanmamızı bekler
- Her component'ı server component yapamıyoruz. Kullanıcı etkileşimi gerektiren (onClick,onSubmit), veya hooks (useState,useEffect) kullanana bileşenler client component olmak zorundadır

- Not: Next.js bizden olabildiğince çok server component kullanmamızı istediği için eğer bir sayfa içerisinde kullanıcı etkileşimi gerektiren bir alan varsa bütün sayfayı client component yapmak yerine ilgili alanı ayrı bir client component yaparız sayfa ise server component kalmaya devam eder

## İç İçe Kullanım

- Bir `server component` içerisinde `client component` yazmakta bir sorun yoktur
- Bir `client component` içerisinde `server component` kullanırsak server component client component'a dönüşür
- Bir `client component` içerisinde `server componment` children propuyla (HOC) aldığımızda zaman sever component'ın yapısı bozulmaz

# Data Fetching

- Next.js çekilen veriyi belirli bir süre boyunca cahe'de tutar ve veriyi çeken fonksiyonu tekrar çalıştırdığımızda api'dan veriyi tekrar çekmek yerine önceki istekden gelen cache'de tutulan veriyi kullanır.

- Bu sayede:
- - api'dan cevap beklemek gerekmez > daha hızlı
- - api'a gereksiz istek gitmez > daha az maaliet
- - büyük oranda redux/context gibi global state managment'a ihtiyaç duymuyoruz > daha pratik

- Not: Next.js varsayılan olarak api'dan gelen cevabı cache'de tutar ama bu fetch methoduna gönderilecek parametrelerle değiştirilebilir

## Fetch Ayarları

- `cache:no-store`: cache'i asla kullanmaz her istek api'a gider
- `cache:no-cache`: önce cache'e bakar ardından api'a istek atıp cache'deki verinin güncelliğini kontrol eder cache'deki veri eskiyse yeniler değilse cache'deki veriyi kullanır
- `cache:force-cache`: varsayılan ayardır, api'dan gelen veri cache'de saklanır
- `revalidate:süre`: cache'in ne kadar süre geçerli olucağını belirler

# Next.js Methodları

## useRouter

- sadece `client` componentlarda kullanılır
- proje içerisinde yönlendirme yapmak için kullanılır
- back() | forward() | refresh() | push() methodları vardır

## redirect

- sadece `server` componentlarda kullanılır
- yönlendirme yapmak için kullanılır

## notFound

- hem `server` hem de `client` component'larda kullanılabilir
- 404 sayfasını ekrana basmak
