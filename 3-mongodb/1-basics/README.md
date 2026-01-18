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

- `db.users.insertOne()`
- kolleksiyona bir belge ekler
- kolleksiyon yok ise oluşturur

- `db.users.insertMany()`
- kolleksiyona birden fazla belge ekler

- `db.users.findOne()`
- kolleksiyondaki bir belgeyi alır

- `db.users.findMany()`
- kolleksiyondaki bütün belgeleri alır

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

- Exists
- `{email: { $exists: true} }`
- `{email: { $exists: false} }`
- Belgede belirli bir alana sahip olan/olmayan belgeleri filtreler
