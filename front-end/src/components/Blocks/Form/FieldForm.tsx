import Field from "./Field";
import { styleField } from "../../../utils/StyleUtil";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type InputField = {
  id: string;
  label: string;
  type?: "password" | "user" | "custom" | "dropdown";
  options?: {value: string, label: string}[],
  customIcon?: IconProp;
  placeholder: string;
  required: boolean;
};

export type InputFieldArray = InputField[];

type FieldValue = {
  input: HTMLInputElement | HTMLSelectElement;
  valid: boolean;
  value: string;
};

export type ValuesMap = {
  [key: string]: FieldValue;
};

type InputParamsType = {
  formSize: number,
  inputParams: InputFieldArray;
  sendInfo: (data: ValuesMap) => void;
  containerRef?: React.Ref<HTMLDivElement>; // new optional prop
};

const FieldForm = ({ formSize, inputParams, sendInfo, containerRef }: InputParamsType) => {
  const values: ValuesMap = {};

  const validate = (
    input: HTMLInputElement | HTMLSelectElement,
    value: string,
    required: boolean,
    id: string
  ) => {
    const inputContainer = input.parentNode as HTMLElement;

    if (value.length === 0 && required) {
      values[id] = { input: input, valid: false, value: value };
      styleField(inputContainer, false);
    } else {
      values[id] = { input: input, valid: true, value: value };
      styleField(inputContainer, true);
    }

    sendInfo(values);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    required: boolean,
    id: string
  ) => {
    const element = e.target;
    const value = e.target.value;
    validate(element, value, required, id);
  };

  return (
    <div ref={containerRef} className={`w-full ${formSize === 2 ? 'grid grid-cols-2 gap-4 max-lg:grid-cols-1' : ''}`}> {/* attach the ref here */}
      {inputParams.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          customIcon={field.customIcon}
          options={field.options}
          onChange={(e) => {
            onChangeHandler(e, field.required, field.id);
          }}
          required={field.required}
        />
      ))}
    </div>
  );
};

export default FieldForm;
