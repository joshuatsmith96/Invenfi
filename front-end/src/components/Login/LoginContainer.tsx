import FieldForm from "../Blocks/Form/FieldForm.tsx";
import LoginButton from "./LoginButton";
import type { ValuesMap } from "../Blocks/Form/FieldForm.tsx";
import { FormFieldSpec } from "./FormFieldSpec.ts";
import { useRef } from "react";
import { styleField } from "../../utils/StyleUtil.ts";

const LoginContainer = () => {
  let fieldData: ValuesMap = {};

  const retrieveFormData = (data: ValuesMap) => {
    fieldData = data;
  };

  const formRef = useRef<HTMLDivElement>(null);

  const isValid = () => {
    const allFields = formRef.current?.children;
    const inputsArray = allFields ? Array.from(allFields) : [];
    const arrayOfInputs = inputsArray.map((field) => {
      return field.children[1].children[1];
    });

    const validArray: Array<boolean> = [];

    arrayOfInputs.map((input, count) => {
      const valid = fieldData[input.id] != undefined ? fieldData[input.id].valid : false;
      const field = allFields ? allFields[count].children[1] : undefined;
      if (fieldData[input.id] && valid) {
        validArray.push(true);
        styleField(field, true);
      } else {
        validArray.push(false)
        styleField(field, false);
      }
    });

    return validArray.includes(false) ? false : true
  };

  const submitLoginCredentials = () => {
    if(isValid()){
      console.log("ENTIRE FORM IS VALID")
      sendData()
    } else {
      console.log("ENTIRE FORM IS NOT VALID")
    }
  };

  const sendData = () => {
    console.log("Data is acceptable.");
    console.log("Acceptable Data", fieldData);
  };

  return (
    <div className="bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-[450px] max-[480px]:w-[350px]">
      <h1 className="font-medium text-3xl mb-5">Login</h1>
      <FieldForm
        containerRef={formRef} // pass the ref here
        inputParams={FormFieldSpec}
        sendInfo={retrieveFormData}
      />
      <LoginButton onClick={submitLoginCredentials} />
    </div>
  );
};

export default LoginContainer;
