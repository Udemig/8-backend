"use client";

const Error = ({ error, reset }) => {
  return <div className="bg-red-500/10 p-2 rounded-md">Hata! {error.message}</div>;
};

export default Error;
