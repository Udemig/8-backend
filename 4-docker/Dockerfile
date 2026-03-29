#! BASE IMAGE - TABAN İMAJ
# Nodejs backendimizi çalıştırmak için oluşturucağımız sanal bilgisyarın içerisinde nodejs yüklü olması gerektiğinden base image olarak nodejs'i seçeriz
# 'alpine' versiyonu küçük boyutlu, daha hızlı yayınlanabilen, Linux işletim sistemi örneğidir
FROM node:20-alpine

#! ÇALIŞMA DİZİNİ
# Projemizin kodlarının sanal ortamda hangi dizine yükleniceğini belirledik
WORKDIR /app

#! BAĞIMLILIKLARI KOPYALAMA
# Projemizdeki package.json dosyasını sanal ortamdaki /app dizinine kopyala
COPY package*.json ./

#! BAĞIMLILIKLARI İNDİR
# npm ci => npm install'a göre daha temiz kurulum yapar (cache kullanmaz)
RUN npm ci --legacy-peer-deps

#! KODLARI KOPYALAMA
# Artık tüm uygulamanın kodlarını kopylayıp sanal ortama aktarmalıyız
# .dockerignore ile node_modules'ün aktarılmasını engelle
COPY . .

#! PORT BELİRLEME
# Sanal konteynerdan bizim cihazım arasında iletişim kuralacak portu belirle
EXPOSE 3000

#! AYAĞA KALDIRMA
# Express uygulamamızı çalıştır
CMD ["npm","run","dev"]