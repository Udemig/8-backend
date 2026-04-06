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
