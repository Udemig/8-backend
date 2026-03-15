import type { FC } from "react";
import { gigInputs } from "../../utils/constants";
import Field from "../../components/form/field";

const AddGig: FC = () => {
  return (
    <div className="container p-5">
      <h1 className="title">Yeni Hizmet Oluştur</h1>

      <form>
        <div className="grid md:grid-cols-2 gap-x-10">
          {gigInputs.map((item) => (
            <Field {...item} />
          ))}

          {/* todo: select */}
        </div>

        <div className="flex md:justify-center my-5">
          <button className="form-button bg-green-600 w-1/2 max-md:w-full flex justify-center">Oluştur</button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
