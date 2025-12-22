import Hero from "./hero";
import { useQuery } from "@tanstack/react-query";
import api from "../../service/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "./card";

const Home = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies"),
    select: (res) => res.data,
  });

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error.message} refetch={refetch} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((movie) => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
