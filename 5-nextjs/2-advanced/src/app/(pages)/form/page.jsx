"use client";
import { handleAction } from "@/utils/actions";
import { useActionState } from "react";

const Form = () => {
  const [state, formAction, pending] = useActionState(handleAction);

  return (
    <form action={formAction} className="flex flex-col">
      <label className="mt-2 mb-2">İsim</label>
      <input name="name" type="text" className="border my-1 rounded-md p-2" />

      <label className="mt-5 mb-2">Yaş</label>
      <input name="age" type="number" className="border my-1 rounded-md p-2" />

      <button disabled={pending} className="my-10 bg-white text-black p-1 rounded-lg cursor-pointer">
        Gönder
      </button>
    </form>
  );
};

export default Form;
