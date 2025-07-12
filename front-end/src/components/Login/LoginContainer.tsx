import FieldForm from "../Blocks/Form/FieldForm.tsx";
import LoginButton from "./LoginButton";
import { styleField } from "../../utils/StyleUtil.ts";
import type { ValuesMap } from "../Blocks/Form/FieldForm.tsx";
import { FormFieldSpec } from "./FormFieldSpec.ts";

const LoginContainer = () => {
  let fieldData: ValuesMap = {}

  const retrieveFormData = (data: ValuesMap) => {
    fieldData = data
  }

  const submitLoginCredentials = () => {
    FormFieldSpec.map((fieldSpec) => {
      if(fieldData[fieldSpec.id] === undefined) {
        console.log(fieldSpec.id + " is not filled in")
      } else {
        console.log(fieldSpec.id + " is filled in")
      }
    })
  }

  return (
    <div className="bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-[450px] max-[480px]:w-[350px]">
      <h1 className="font-medium text-3xl mb-5">Login</h1>
      <FieldForm inputParams={FormFieldSpec} sendInfo={retrieveFormData}/>
      <LoginButton onClick={submitLoginCredentials}/>
    </div>
  );
};

export default LoginContainer;
