# Proje Yayınlama

### Build

- Derleme aşamasına verilen isimdir.
- Geliştirme ortamındaki kodları alır, yayınlama ortamı için optimize eder
- Örn bir react projesinde:
- - tüm js dosyalarını birleştirir ve optimize eder
- - tüm css dosylarını birleştirir ve optimize eder
- - gereksiz açıklama satırları silinir
- - ve sonuç olarak bir dist klasörü içerisinde projenin optimize edilmiş, yayına hazır versiyonu oluşur

### Github / Docker

- Modern yayınlama yöntemlerinde projenin ci/cd süreci için github veya docker platform'larından birinde olması gerekli

### CI/CD

- Continuous Integration (Sürekli Entegrasyon) ve Continuous Delivery (Sürekli Dağıtım)

- **CI**
- Proje yayınladıktan sonra zaman zaman proje üzerinden güncellemler yapıp githuba gönderirir.

- **CD**
- Githuba gönderilen kodun otomatik olarak build'i alınıp sunucuda yayınlanması işlemidir.

### Hosting (Barındırma)

- Projenin sürekli çalışıcağı bir sunucuya yükleme işlemdir
- frontend: vercel, netlify, firebase-hosting
- backend: google cloud run, railway, heroku, render
- vps: digital-ocean, aws, contabo

### Deployment (Dağıtma)

- Projenin yayınlanması işlemi

### Scaling (Ölçeklendirme)

- Bir sistemin artan kullanıcı, trafik veya veri yükünü kaldırabilecek şekilde büyütülmesi demektir
- Vertical: Tek sunucunun gücü arttırılır (CPU,RAM,Disk)
- Horizontal: Sunucu sayısı arttırılır

### Load Balancer

- Gelen istekleri birden fazla sunucuya dengeli şekilde dağıtan sistemdir.
- Tek sunucnun aşarı yüklenmesini önler
- Sistemin çökmesini engeller
- Performası arttırır

### Domain

- İnternet üzerindeki bir adrestir. Kullanıcı bir webssistesine girmek için IP adresi (192.168.1.5.3) yerine daha akılda kalıcı bir alan adı (www.amazon.com) kullanılır.

- **Domain Parçaları**
- - www: alt alan adı (sub domain)
- - amazon: asıl alan adı (domain)
- - .com/.net: üst alan adı (tld)

- **Domain Alınabilecek Platformlar**
- Godaddy, namecheap, natro, isimtescil

### DNS

- Domain Name System, Alan adlarını IP adresilerine yönlendirir.
- **A Kaydı**: Bir alan adını IP adresine bağlar (www.furkanevin.com ---> 164.253.56.3)
- **AAAA Kaydı**: Bir alan adını IPv6 adresine bağlar (www.furkanevin.com ---> 2001:4860:4802:36::15)
- **CName Kaydı**: Bir domaini başka bir domaine yönlendirir (www.furkanevin.com ---> furkanevin.com)
- **TXT Kaydı**: Metin tabanlı bilgi tutar
