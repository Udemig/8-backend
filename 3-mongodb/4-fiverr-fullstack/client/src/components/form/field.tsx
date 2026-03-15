import type { FC } from "react";

interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  multiple?: boolean;
}

const Field: FC<Props> = ({
  label,
  name,
  min,
  max,
  placeholder,
  type = "text",
  disabled = false,
  required = true,
  multiple = false,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name}>{label}</label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="field min-h-25 max-h-62.5"
        />
      ) : (
        <input
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
          multiple={multiple}
          className="field"
        />
      )}
    </div>
  );
};

export default Field;
