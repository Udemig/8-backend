import Form from "../../components/form";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (recipeData) => api.post("/api/recipes", recipeData),

    // api isteği başarılı olduğunda çalışıcak fonksiyon
    onSuccess: (res) => {
      toast.success("Yeni tarif oluşturuldu");
      navigate(`/tarif/${res.data.data.id}`);
    },

    // api isteği başarısız olursa
    onError: () => {
      toast.error("Bir sorun oluştu!");
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-800">Yeni Tarif Oluştur</h1>
      <p className="text-stone-500 mt-1">Yeni bir tarif eklemek için formu doldurun</p>

      <Form mutate={mutate} isPending={isPending} />
    </div>
  );
};

export default Create;
