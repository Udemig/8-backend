import type { FC } from "react";
import { useDeleteGig } from "../../service/gig";
import Loader from "../loader";

interface Props {
  id: string;
  show?: boolean;
}

const DeleteButton: FC<Props> = ({ id, show }) => {
  const { isPending, mutate } = useDeleteGig();

  if (!show) return;

  return (
    <div className="flex justify-end px-2">
      <button disabled={isPending} className="button bg-red-500 cursor-pointer h-8" onClick={() => mutate(id)}>
        {isPending ? <Loader designs="!text-lg text-white" /> : "Sil"}
      </button>
    </div>
  );
};

export default DeleteButton;
