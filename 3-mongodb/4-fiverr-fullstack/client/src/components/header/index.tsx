import type { FC } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./search-form";
import Links from "./links";
import { useProfile } from "../../service/auth";
import UserInfo from "./user-info";

const Header: FC = () => {
  const { user } = useProfile();

  return (
    <header className="p-5 shadow">
      <div className="container flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/logo.png" alt="fiverr logo" className="w-25" />
        </Link>

        <SearchForm />

        {user ? <UserInfo user={user} /> : <Links />}
      </div>
    </header>
  );
};

export default Header;
