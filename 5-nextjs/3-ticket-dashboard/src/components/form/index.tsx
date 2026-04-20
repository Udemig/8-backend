import { Ticket } from "@/types";
import { FC } from "react";

interface Props {
  isEditMode: boolean;
  editItem: Ticket | null;
}

const Form: FC<Props> = ({ isEditMode, editItem }) => {
  return (
    <div className="max-w-150">
      <form className="flex flex-col gap-5">{/* TODO */}</form>
    </div>
  );
};

export default Form;
