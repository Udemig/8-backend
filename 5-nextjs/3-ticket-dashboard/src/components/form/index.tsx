import { Ticket } from "@/types";
import { FC } from "react";
import Field from "./field";
import { categoryOptions, PriorityLabels, ticketOptions, ticketPriorities } from "@/utils/constants";
import { createTicketAction } from "@/utils/actions";

interface Props {
  isEditMode: boolean;
  editItem: Ticket | null;
}

const Form: FC<Props> = ({ isEditMode, editItem }) => {
  return (
    <div className="max-w-150">
      <form action={createTicketAction} className="flex flex-col gap-5">
        {/* Düzenleme modunda server action fonksiyonun id'yi gönderilebilmek için id değerini formun içerisine ekle */}
        {editItem && <input type="text" name="id" value={editItem?._id} readOnly hidden />}

        <Field label="Başlık">
          <input type="text" name="title" className="input" required maxLength={100} defaultValue={editItem?.title} />
        </Field>

        <Field label="Açıklama">
          <textarea
            name="description"
            className="input min-h-20 max-h-96"
            required
            maxLength={100}
            defaultValue={editItem?.description}
          />
        </Field>

        <Field label="Kategori">
          <select name="category" required className="input" defaultValue={editItem?.category}>
            <option value="">Kategori Seçiniz</option>

            {categoryOptions.map((item, key) => (
              <option key={key} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Öncelik">
          <div className="flex flex-wrap items-center gap-2">
            {ticketPriorities.map((priority) => (
              <div key={priority} className="flex items-center gap-2">
                <input
                  id={`${priority}`}
                  type="radio"
                  name="priority"
                  value={priority}
                  required
                  className="size-4"
                  defaultChecked={editItem?.priority === priority}
                />

                <label htmlFor={`${priority}`}>
                  {priority} - {PriorityLabels[priority]}
                </label>
              </div>
            ))}
          </div>
        </Field>

        <Field label="İlerleme">
          <input type="range" name="progress" min={0} max={100} step={5} defaultValue={editItem?.progress} />
        </Field>

        <Field label="Durum">
          <select name="status" className="input" required defaultValue={editItem?.status}>
            <option value="">Durum Seçiniz</option>

            {ticketOptions.map((item, key) => (
              <option key={key} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="submit"
          className="bg-blue-600 mt-5 p-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-10.5"
        >
          {isEditMode ? "Kaydet" : "Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default Form;
