import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../../service/auth";
import Loader from "../loader";

const Protect: FC = () => {
  // oturumu açık olan kullanıcı verisini al
  const { user, isLoading } = useProfile();

  // kullanıcı verisi yükleniyorsa loader bas
  if (isLoading) return <Loader />;

  // kullanıcı oturumu kapalıysa veya satıcı hesabı değilse:
  // sayfaya girmeye izin verme ve login sayfasına yönlendir
  if (!user || !user.isSeller) return <Navigate to="/login" replace />;

  // kullanıcı satıcı hesabındaysa sayfayı göster
  return <Outlet />;
};

export default Protect;
