import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: () => api.delete(`/api/recipes/${id}`),

    // istek başarılı olursa
    onSuccess: () => {
      // bildirim göster ve anasayfaya yönlendir
      toast.success("Tarif kaldırıldı");
      navigate("/");
    },

    // istek başarısız olursa
    onError: () => {
      // bildirin göstser
      toast.error("İşlem başarısız oldu");
    },
  });

  return (
    <button disabled={isPending} onClick={mutate} className="btn bg-rose-500 hover:bg-rose-600 py-2 px-4">
      Sil
    </button>
  );
};

export default DeleteButton;
