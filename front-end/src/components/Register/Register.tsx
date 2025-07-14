import { forwardRef } from "react";
import { FormFieldSpec } from "./FormFieldSpec";
import type { ValuesMap } from "../Blocks/Form/FieldForm";
import { useRef } from "react";
import FieldForm from "../Blocks/Form/FieldForm";
import TransparentContainer from "../Blocks/TransparentContainer/TransparentContainer";
import { styleField } from "../../utils/StyleUtil";

const Register = forwardRef<HTMLDivElement>((_, ref) => {
  let fieldData: ValuesMap = {};
  const formRef = useRef<HTMLDivElement>(null);

  const retrieveFormData = (data: ValuesMap) => {
    fieldData = data;
    console.log("Field Data From Register", fieldData);
  };

  const registerUser = () => {
    if (isValid()) {
      console.log("ENTIRE FORM IS VALID");
    } else {
      console.log("ENTIRE FORM IS NOT VALID");
    }
  };

  const isValid = () => {
    const allFields = formRef.current?.children;
    const inputsArray = allFields ? Array.from(allFields) : [];
    console.log(inputsArray)
    const arrayOfInputs = inputsArray.map((field) => {
      return field.children[1].children[1];
    });

    const validArray: Array<boolean> = [];

    arrayOfInputs.map((input, count) => {
      console.log(input)
      const valid = fieldData[input.id] != undefined ? fieldData[input.id].valid : false;
      const field = allFields ? allFields[count].children[1] : undefined;
      const isRequired = FormFieldSpec.find((item) => item.id === input.id)?.required;
      console.log("IS THIS REQUIRED?", isRequired);

      if (!isRequired) {
        validArray.push(true);
      } else {
        if (fieldData[input.id] && valid) {
          validArray.push(true);
          styleField(field, true);
        } else {
          validArray.push(false);
          styleField(field, false);
        }
      }
    });

    return validArray.includes(false) ? false : true;
  };

  console.log(isValid)

  return (
    <TransparentContainer ref={ref} formSize={2}>
      <h1 className="font-medium text-3xl mb-5">Register</h1>
      <FieldForm
        formSize={2}
        containerRef={formRef} // pass the ref here
        inputParams={FormFieldSpec}
        sendInfo={retrieveFormData}
      />
      <button onClick={registerUser}>Click Me</button>
    </TransparentContainer>
  );
});

export default Register;
