import type { FC } from "react";
import type { User } from "../../types";
import { Link } from "react-router-dom";
import { useLogout } from "../../service/auth";

interface Props {
  user: User;
}

const UserInfo: FC<Props> = ({ user }) => {
  const { isPending, mutate } = useLogout();

  const menuItems = [
    user.isSeller && { label: "Hizmetlerim", to: "/my-gigs" },
    user.isSeller && { label: "Hizmet Ekle", to: "/add-gig" },
    { label: "Profil", to: "/" },
    { label: "Ayarlar", to: "/" },
  ].filter(Boolean) as { to: string; label: string }[];

  return (
    <div className="relative group">
      <div className="flex justify-center items-center gap-2">
        <img src={user.profilePicture} className="size-10 rounded-full object-cover" />
        <span>{user.username}</span>
      </div>

      <div className="w-37.5 text-[13px] absolute hidden group-hover:flex flex-col top-10 left-0 bg-gray-200 rounded-md text-center">
        {menuItems.map(({ to, label }, i) => (
          <Link to={to} key={i} className="header-link">
            {label}
          </Link>
        ))}

        <button onClick={() => mutate()} disabled={isPending} className="header-link">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
