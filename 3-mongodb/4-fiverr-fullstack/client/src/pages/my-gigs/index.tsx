import type { FC } from "react";
import { useProfile } from "../../service/auth";
import { useGetAllGigs } from "../../service/gig";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";

const MyGigs: FC = () => {
  // kullanıcın profil verisini al
  const { user } = useProfile();

  // kullanıcıya ait hizmet verilerini al
  const { isLoading, error, data, refetch } = useGetAllGigs({ userId: user?.id });

  return (
    <div className="container max-md:p-5 py-5">
      <h1 className="title">Hizmetlerim</h1>

      <div>
        {isLoading ? (
          <Loader designs="my-" />
        ) : error ? (
          <Error message={error?.message} refetch={refetch} />
        ) : (
          <div className="layout">
            {data?.length === 0 ? (
              <div className="text-center my-40">
                <p className="font-semibold">Henüz oluşturduğunuz bir hizmet yok</p>
              </div>
            ) : (
              data?.map((item) => <Card key={item.id} item={item} expand={true} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
