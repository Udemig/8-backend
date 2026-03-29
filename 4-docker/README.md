# Docker

- Uygulamaları taşınabilir ve izole bir ortamda çalıştırmamızı sağlayan container teknolojisidir.

## Image

- Uygulamanın şablonudur
- Örn: Node.js + backend kodları

## Container

- Hafif bir sanal makinadır
- Image'ın çalışmış halidir

## Dockerfile

- Projemizin docker image'ını oluşturmak için kullanılacak komutları belirlediğimiz dosya

## İşleyiş

- Dockerfile ----> Image ----> Container

- **1) Image Oluşturma**
- `docker build -t tour-backend .`

- **2) Container Oluşturma**
- Önceki adımda oluşturduğumuz imaj'ı çalıştırıp container oluşturma
- `docker run -p 3000:3000 --name TourBackend tour-backend`

## Conatainer Yönetimi

- **1) Çalışanları Gör**
- `docker ps`

- **2) Hepsini Gör**
- `docker ps -a`

- **3) Container'ı Durdur**
- `docker stop container-ismi`

- **4) Container'ı Çalıştır**
- `docker start container-ismi`

- **5) Container'ı Kaldır**
- `docker rm container-ismi`

# Docker Compose

- Birden fazla container'ı aynı sanal ortamda yönetmeye yarayan araçtır
- Birden fazla container'ı tek seferde çalıştırabiliyoruz

- **docker-compose.yml** dosyası oluşturulmalı
- `docker compose up -d --build` komutuyla docker compose çalıştıırlmalı
- -d: detached, yani arkaplanda çalıştır
- --build: docker file'a göre image'ı yeniden build eder

## Compose Yönetimi

- **1) Çalışanları Gör**
- `docker compose ps`

- **3) Compose'u Durdur**
- `docker compose down compose-ismi`

- **4) Container'ı Çalıştır**
- `docker compose up`

# Docker HUB

- Docker HUB, Docker container'larını depoladığımız ve paylaştığımız resmi bulut servisidir.
- Github kod içinse DockerHub image için
- DockerHub'a kendi docker'imaghlarımı yükleyip saklayabiliriz.
- Public veya private olarak image'larımızı paylaşabilirsiniz.
- Node Mongo gibi hazır image'lar kullanılabilir

## DockerHub'a Image Gönderme

- **1) Repo Oluştur**
- Dockerhub üzerinden bir repo oluşturulur

- **2) Image'ı Oluştur**
- Image oluşturuken tag olarak dockerhub'daki `kullanıcı_adı/repo` etiketi eklenmeli

- **3) DockerHub'a Pushla**
- `docker push kullanıcı_adı/repo:sürüm` komutuyla imaj dockerhub'a yüklenir

- **4) DockerHub'dan Image Alma**
- Aynı image üzerinen başka bilgisayarda çalışmak istersek:
- `docker pull kullanıcı_adı/repo:sürüm` komutuyla imajı dockerhub'dan bilgisayarımıza çekeriz
