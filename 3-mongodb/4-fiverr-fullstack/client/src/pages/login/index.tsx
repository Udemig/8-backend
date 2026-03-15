import type { FC, SubmitEvent } from "react";
import Field from "../../components/form/field";
import { Link } from "react-router-dom";
import { useLogin } from "../../service/auth";
import type { LoginData } from "../../types";

const Login: FC = () => {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const loginData = Object.fromEntries(formData.entries()) as unknown as LoginData;

    mutate(loginData);
  };

  return (
    <div className="pt-24 max-w-125 mx-auto sm:min-w-100 max-sm:w-full p-5">
      <h1 className="title mb-10">Hesabınıza Giriş Yapın</h1>

      <form onSubmit={handleSubmit}>
        <Field label="İsim" name="username" />
        <Field label="Şifre" name="password" />

        <button disabled={isPending} className="form-button">
          Giriş Yap
        </button>
      </form>

      <p className="mt-5 text-gray-500">
        Hesabınız yok mu?{" "}
        <Link to="/register" className="ms-3 text-blue-500">
          Kaydolun
        </Link>
      </p>
    </div>
  );
};

export default Login;
