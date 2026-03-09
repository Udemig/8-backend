import type { FC } from "react";
import Hero from "./hero";
import Category from "./category";
import Info from "./info";

const Home: FC = () => {
  return (
    <div>
      <Hero />

      <div className="p-5">
        <Category />

        <Info />
      </div>
    </div>
  );
};

export default Home;
