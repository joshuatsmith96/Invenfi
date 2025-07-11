import FieldForm from "../Blocks/Form/FieldForm.tsx";
import LoginButton from "./LoginButton";
import { FormFieldSpec } from "./FormFieldSpec.ts";

const LoginContainer = () => {

  return (
    <div className="bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-[450px] max-[480px]:w-[350px]">
      <h1 className="font-medium text-3xl mb-5">Login</h1>
      <FieldForm inputParams={FormFieldSpec} />
      <LoginButton />
    </div>
  );
};

export default LoginContainer;
