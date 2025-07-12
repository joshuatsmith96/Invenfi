import Field from "./Field";
import { styleField } from "../../../utils/StyleUtil";

export type InputField = {
  id: string;
  label: string;
  type: "password" | "text";
  placeholder: string;
  required: boolean;
}[];

type FieldValue = {
  input: HTMLInputElement;
  valid: boolean;
  value: string;
};

export type ValuesMap = {
  [key: string]: FieldValue;
};

type InputParamsType = {
  inputParams: InputField;
  sendInfo: (data: ValuesMap) => void;
};

const FieldForm = ({ inputParams, sendInfo }: InputParamsType) => {
  const values: ValuesMap = {};

  const validate = (input: HTMLInputElement, value: string, required: boolean, id: string) => {
    //If value length is 0, send a message to the field that it is not valid.
    const inputContainer = input.parentNode as HTMLElement;
    //NEXT STEP IS TO ADD CLASSLIST STYLES
    if (value.length === 0 && required) {
      //Not Valid
      values[id] = { input: input, valid: false, value: value };
      styleField(inputContainer, false);
    } else {
      //Valid
      values[id] = { input: input, valid: true, value: value };
      styleField(inputContainer, true);
    }

    sendInfo(values);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    required: boolean,
    id: string
  ) => {
    const element = e.target;
    const value = e.target.value;
    validate(element, value, required, id);
  };

  return (
    <>
      {inputParams.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          onChange={(e) => {
            onChangeHandler(e, field.required, field.id);
          }}
          required={field.required}
        />
      ))}
    </>
  );
};

export default FieldForm;
