import { useMutation } from "@tanstack/react-query";
import { IoTrashSharp } from "react-icons/io5";
import api from "../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    // api isteğini atan fonksiyon
    mutationFn: () => api.delete(`/movies/${id}`),
    // api isteği başarılı olunca çalışır
    onSuccess: () => {
      toast.success("Film kaldırıldı");
      navigate("/");
    },
    // api isteği başarısız olunca çalışır
    onError: () => toast.error("İşlem başarısız"),
  });

  const handleDelete = () => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;

    mutate();
  };

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
    >
      <IoTrashSharp />
    </button>
  );
};

export default DeleteButton;
