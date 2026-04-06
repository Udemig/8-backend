import Image from "next/image";

import localeImage from "@/assets/nature.jpg";

const remoteImage =
  "https://images.pexels.com/photos/35627510/pexels-photo-35627510.jpeg?_gl=1*1jmczte*_ga*NjI4NzE0NzIzLjE3NTk4NjM4OTU.*_ga_8JE65Q40S6*czE3NzUzODM1ODUkbzckZzEkdDE3NzUzODM3MTYkajU5JGwwJGgw";

const Page = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1>Locale Resim (unoptimized)</h1>
        <Image src={localeImage} alt="doğa" unoptimized />
      </div>

      <div>
        <h1>Locale Resim (optimized)</h1>
        <Image src={localeImage} alt="doğa" quality={10} placeholder="blur" />
      </div>

      <div>
        <h1>Remote Resim</h1>
        <Image src={remoteImage} alt="istanbul" width={1920} height={1080} unoptimized />
      </div>

      <div>
        <h1>Remote Resim</h1>
        <Image src={remoteImage} alt="istanbul" width={1920} height={1080} quality={40} />
      </div>

      <div className="relative h-100">
        <h1>Remote Resim</h1>
        <Image src={remoteImage} alt="istanbul" fill />
      </div>
    </div>
  );
};

export default Page;
