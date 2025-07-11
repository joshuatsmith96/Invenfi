import Field from "./Field";

export type InputField = {
  id: string;
  label: string;
  type: "password" | "text";
  placeholder: string;
}[];

type InputParamsType = {
  inputParams: InputField
};

const FieldForm = ({ inputParams }: InputParamsType) => {
  return (
    <>
      {inputParams.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          onChange={() => {}}
        />
      ))}
    </>
  );
};


export default FieldForm;
