# Enviroment Variables

- Ortam / Çevre değişkenleri

- Projeyi paylaşırken, admin şifresi / veritabanı bağlantı url / api key gibi hasas bilgileri paylaşmak istemeyiz

- Bu noktada projenin çalışması için gerekli olan ama githuba göndermek istemediğimiz değişkenleri .env dosyasında tanımlarız

- .gitignore dosyasınıda .env dosyasını eklersek burada değişkenler kendi bilgisayarımızda çalışırken githuba asla gönderilmez

- Sadece hassas bilgileri değil proje yayınlandıktan sonra değiştirlmesi gerekebilececik verileride genelde .env de tutmayı techih ederiz bu sayede bu değerleri hızlıca güncelleyebilir ve tekrardan yayınlamak zorunda kalmayız. (ör: ŞİFRE YANLIŞ DENEME HAKKI)

# MongoDB Veri Türleri

- string
- - metinsel veri
- - ad soyad, e-posta, açıklama kategori

- boolean
- - true / false değerleri
- - aktif mi? admin mi? gösterelsin mi?

- array
- - birden fazla değeri liste halinde tutar
- - etiketler, roller, çocuklar

- object
- - iç içe json yapısı
- - adres bilgisi, profil bilgisi

- objectId
- - mongodb'Nin kendi 12 byte'lık benzersiz ID'si
- - belge id'lerinde kullanıdılır

- int32 (32 bit integer)
- - 4 byte
- - sadece tam sayı
- - aralık: -2,147,483,648,2,147,483,648
- - en hızlı integer türüdür

- int64 (64 bit integer)
- - 8 byte
- - sadece tam sayı
- - aralık çok büyük

- double (64 bit floating)
- - 8 byte
- - ondalık / küsüratlı sayı

- decimal128
- - 16 byte
- - kesin ondalık (hatasız)
- - 34 basamak hassasiyet
- - bankacılık gibi alanlarda kullanılır

- date
- - mongodb'nin en çok kullanılan tarih türüdür
- - milissaniyeye kadar zamanı tutar
- - javascript'teki Date'in
- - kullanıcı kayıt tarihi / saipariş zamanı .... alanlarda kullanılır

- timestamp
- - mongodb'nin kendi iç mekanizmalarında kullandığı özel bir veri türüdür
- - mongodb arkplandaki operesyonlarda kullanır kendi kayıt ettiğimiz verilerde kullanmayı tercih etmeyiz

- null
- - boş / olmayan değer
- - eksik alanlar

- undefined
- - tanımsız değer
- - henüz ataması yapılmamış alanlarda kullanılır

- binary
- - ham ikili veri tutar
- - dosya, resim, pdf alanlarında kullanılır

# MongoDB Terminal Komutları

- `show dbs`
- sunucudaki veritabanlarını gösteriri

- `use database_name`
- bir veritabanın içerine girer

- `db.users.insertOne(eklenicekData)`
- kolleksiyona bir belge ekler
- kolleksiyon yok ise oluşturur

- `db.users.insertMany(eklenicekData)`
- kolleksiyona birden fazla belge ekler

- `db.users.findOne(filtreler)`
- kolleksiyondaki bir belgeyi alır

- `db.users.findMany(filtreler)`
- kolleksiyondaki bütün belgeleri alır

- `db.users.updateOne(filtreler, güncelleme)`
- kolleksiyondaki bir belgeyi günceller

- `db.users.updateMany(filtreler, güncelleme)`
- kolleksiyondaki koşula uyan bütün belgeleri günceller

- `db.users.deleteOne(filtreler)`
- kolleksiyondaki bir belgeyi siler

- `db.users.deleteMany(filtreler)`
- kolleksiyondaki koşula uyan bütün belgeleri siler

- `db.users.countDocument()`
- kolleksiyondaki belge sayısını verir

- `db.users.distinct("address.country")`
- ilgili alan için benzersiz değerlerden oluşan bir liste döndürür

- `db.users.findOneAndDelete(filtre)`
- bir belgeyi kaldırır ve kaldırdığı belgenin bilgilerini döndürür

- `db.users.findOneAndUpdate(filtre, güncelleme)`
- bir belgeyi günceller ve güncellediği belgenin bilgilerini döndürür

- `db.users.findOneAndReplace(filtre, güncelleme)`
- bir belgeyi günceller ve güncellediği belgenin bilgilerini döndürür
- update yönteminden farklı olarak belgedeki bütün alanları yazmalıyız

# Filtreleme Operatörleri

- Eşitlik filtresi:
- `{name:"Ali"}`

- `{name: {$ne:"Ali"}}`
- Eşit değildir

- `{age: {$gt:18} }`
- Büyüktür (>)

- `{age: {$lt:18} }`
- Küçüktür (<)

- `{age: {$gte:18} }`
- Büyük eşittir (>=)

- `{age: {$lte:18} }`
- Küçük Eşittir (<=)

- `{skills: {$in: ["Sales"]} }`
- Dizide bir eleman varsa filtreler

- `{skills: {$nin: ["Sales"]} }`
- Dizide bir eleman yoksa filtreler

# Mantıksal Operatörleri

- And
- `{$and: [kosul1, kosul2, kosul3]}`
- verilen bütün koşullar gerçekleşirse belgeyi filtreler

- Or
- `{$or: [kosul1, kosul2, kosul3]}`
- verilen koşullardan en az biri gerçekleşirse belgeyi filtreler

- Nor
- `{$nor: [kosul1, kosul2, kosul3]}`
- dizi içerisindeki bütün koşulları tersine çevirir
- verilen koşullardan en az biri gerçekleşirse belgeyi filtreler

- Not
- `{$not: kosul}`
- tanımlanan koşulu tersine çevirir
- büyüktür ===> küçük eşittir
- küçüktür ===> büyük eşittir
- küçük eşittir ===> büyüktür
- büyük eşittir ===> küçüktür
- eşittir ===> eşit değildir

# Diğer Operatörler

- Exists
- `{email: { $exists: true} }`
- `{email: { $exists: false} }`
- Belgede belirli bir alana sahip olan/olmayan belgeleri filtreler

- Regex
- `{name: /kaya/i}`
- Metnin bir kısmı üzerinden filtreleme

- İç İçe Nesneler
- `{"address.country":"Turkey"}`
- İç içe nesnelerde içerideki nesneye erişme yöntemi

- Belirli Değer Aralığı
- `{age: {$gt:30, $lt:40}}`
- Belirli aralıktaki değerleri almak yöntemi
