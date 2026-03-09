import type { FC } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./search-form";
import Links from "./links";

const Header: FC = () => {
  return (
    <header className="p-5 shadow">
      <div className="container flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/logo.png" alt="fiverr logo" className="w-25" />
        </Link>

        <SearchForm />

        <Links />
      </div>
    </header>
  );
};

export default Header;
