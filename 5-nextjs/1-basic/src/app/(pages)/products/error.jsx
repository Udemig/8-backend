"use client";

// Error bileşeni hata sebebini ve bileşeni yeniden renderlamaya yarayan fonksiyonu prop olarak alır
const Error = ({ error, reset }) => {
  return (
    <div className="bg-red-500/10 rounded-lg py-5 px-10 text-center space-y-5">
      <p>{error.message}</p>

      <button onClick={reset}>Tekrar Dene</button>
    </div>
  );
};

export default Error;
