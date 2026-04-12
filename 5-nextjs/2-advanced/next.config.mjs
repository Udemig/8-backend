/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dış kaynaklardan url ile ekrana bastığımız resimlerin nextjs optimizasyonu çalışsın istiyorsak resimleri aldığımız domain adreslerini bu alanda nextjs'e tanıtmalıyız
  images: {
    qualities: [10, 99],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
