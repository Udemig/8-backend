import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const Home = () => {
  // tarif verileri için api isteği atıp gelen yanıtın state'ini tuttuk
  const { isLoading, error, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.get("/api/recipes"),
    select: (res) => res.data.data,
  });

  // todo anasayfayı oluştur
  console.log(isLoading, error, data);

  return <div>Home</div>;
};

export default Home;
