import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type LoginInputType = {
  id: string;
  label: string;
  type?: "password" | "user" | "custom" | "dropdown";
  customIcon?: IconProp;
  placeholder: string;
  options?: { value: string; label: string }[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    required: boolean
  ) => void;
  required: boolean;
};

const Field = ({
  id,
  label,
  type,
  customIcon,
  placeholder,
  onChange,
  required,
  options,
}: LoginInputType) => {
  const inputType = type === "password" ? "password" : "text";
  console.log("INPUT TYPE FOR " + label, inputType);
  return (
    <div className="mb-5 w-full">
      <p className="mb-2 font-medium">{label}</p>
      <div className="border flex flex-row items-center p-3 w-full border-[#d9d9d9] rounded-lg">
        {type === "password" || type === "user" ? (
          <FontAwesomeIcon icon={type === "password" ? faLock : faUser} />
        ) : (
          ""
        )}
        {type === "custom" && customIcon != undefined ? <FontAwesomeIcon icon={customIcon} /> : ""}
        {type === "dropdown" ? (
          <select id={id} className="w-full outline-none" onChange={(e) => onChange?.(e, required)}>
            {options?.map((option) => {
              return (
                <option
                  key={option.value}
                  className="focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
                  value={option.value}
                >
                  {option.label}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            id={id}
            type={inputType}
            className="outline-none pl-2 w-full p-2 ml-2"
            placeholder={placeholder}
            onChange={(e) => onChange?.(e, required)}
          />
        )}
      </div>
      <p className="hidden text-red-400 mt-1 text-sm">Please enter a {label.toLowerCase()}</p>
    </div>
  );
};

export default Field;
