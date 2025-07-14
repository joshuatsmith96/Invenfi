import FieldForm from "../../components/Blocks/Form/FieldForm.tsx";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";
import type { ValuesMap } from "../../components/Blocks/Form/FieldForm.tsx";
import { FormFieldSpec } from "./FormFieldSpec.ts";
import { useRef } from "react";
import { styleField } from "../../utils/StyleUtil.ts";
import type { InputField } from "../../components/Blocks/Form/FieldForm.tsx";
import { callAPI } from "../../utils/callAPI.ts";

type LoginContainerProps = {
  onLogin: () => void;
};

const LoginContainer = ({ onLogin }: LoginContainerProps) => {
  const navigate = useNavigate();
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
      const valid = fieldData[input.id] !== undefined ? fieldData[input.id].valid : false;
      const field = allFields ? allFields[count].children[1] : undefined;
      const isRequired = FormFieldSpec.find((item: InputField) => item.id === input.id)?.required;

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

    return !validArray.includes(false);
  };

  const submitLoginCredentials = () => {
    if (isValid()) {
      console.log("ENTIRE FORM IS VALID");
      sendData();
    } else {
      console.log("ENTIRE FORM IS NOT VALID");
    }
  };

  const sendData = async () => {
    const dataToSend = {
      username: fieldData["login-username"].value,
      password: fieldData["login-password"].value,
    };

    try {
      const response = await callAPI.login(dataToSend);
      console.log("Login success:", response);
      alert("Login successful!");
      onLogin(); // update App's state
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        alert(`Login failed: ${error.message}`);
      } else {
        console.error("Login failed:", error);
        alert("Login failed: Unknown error");
      }
    }
  };

  return (
    <div className="bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-[450px] max-[480px]:w-[350px]">
      <h1 className="font-medium text-3xl mb-5">Login</h1>
      <FieldForm
        formSize={1}
        containerRef={formRef}
        inputParams={FormFieldSpec}
        sendInfo={retrieveFormData}
      />
      <LoginButton onClick={submitLoginCredentials} />
    </div>
  );
};

export default LoginContainer;
