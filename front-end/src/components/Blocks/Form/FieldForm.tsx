import Field from "./Field";

export type InputField = {
  id: string;
  label: string;
  type: "password" | "text";
  placeholder: string;
  required: boolean;
}[];

type InputParamsType = {
  inputParams: InputField;
};

const FieldForm = ({ inputParams }: InputParamsType) => {

  const validate = (input: HTMLInputElement, value: string, required: boolean) => {
    //If value length is 0, send a message to the field that it is not valid.
    const inputContainer = input.parentNode as HTMLElement
    console.log(inputContainer)
    //NEXT STEP IS TO ADD CLASSLIST STYLES
    if (value.length === 0 && required) {
      console.log("Not Valid. Give Red Border And Shake");
      inputContainer.classList.add("border-red-500", "shake")
    } else {
      inputContainer.classList.remove("border-red-500", "shake")
      console.log("Valid");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, required: boolean) => {
    const element = e.target
    const value = e.target.value;
    validate(element, value, required)
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
            onChangeHandler(e, field.required);
          }}
          required={field.required}
        />
      ))}
    </>
  );
};

export default FieldForm;
