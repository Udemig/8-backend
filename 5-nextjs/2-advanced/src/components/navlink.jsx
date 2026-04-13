"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ children, href }) => {
  // url'deki yolu al
  const path = usePathname();

  return (
    <Link href={href} className={path === href ? "font-bold" : ""}>
      {children}
    </Link>
  );
};

export default Navlink;
