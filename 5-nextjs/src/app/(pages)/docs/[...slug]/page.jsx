export const metadata = {
  title: "Belgeler",
  description: "Burada belgeleri inceleyin..",
};

// Sayfa [...slug] yöntemiyle tanımlandığı için parametreler bir dizi içerisinde gelir
const Page = async ({ params }) => {
  const { slug } = await params;

  return (
    <div>
      <h1>Döküman Sayfası</h1>

      {slug.map((param) => (
        <p>{param}</p>
      ))}
    </div>
  );
};

export default Page;
