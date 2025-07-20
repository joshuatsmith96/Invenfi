import FieldForm from "../../components/Blocks/Form/FieldForm.tsx";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import type { ValuesMap } from "../../components/Blocks/Form/FieldForm.tsx";
import { FormFieldSpec } from "./FormFieldSpec.ts";
import { styleField } from "../../utils/StyleUtil.ts";
import type { InputField } from "../../components/Blocks/Form/FieldForm.tsx";
import { callAPI } from "../../utils/callAPI.ts";
import type { RefObject } from "react";

type LoginContainerProps = {
  onLogin: () => void;
  regSectionRef: RefObject<HTMLDivElement | null>
};

const LoginContainer = ({ onLogin, regSectionRef }: LoginContainerProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animateOut, setAnimateOut] = useState(false);
  const navigate = useNavigate();
  let fieldData: ValuesMap = {};
  const formRef = useRef<HTMLDivElement>(null);

  const retrieveFormData = (data: ValuesMap) => {
    fieldData = data;
  };

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

  const submitLoginCredentials = async () => {
      console.log(regSectionRef)

    if (!isValid()) return;

    setAnimateOut(true);
    setLoading(true);
    setTimeout(() => {
      sendData();
    }, 2000);
  };

  const sendData = async () => {
    const dataToSend = {
      username: fieldData["login-username"].value,
      password: fieldData["login-password"].value,
    };

    try {
      await callAPI.login(dataToSend);
      onLogin();
      navigate("/", { replace: true });
    } catch (error: unknown) {
      setLoading(false);
      setAnimateOut(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred.");
      }
    }
  };

  if (loading) {
    return (
      <div className="fade-in text-center">
        <div className="loader mx-auto mb-4"></div>
        <p>Logging in...</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-[450px] max-[480px]:w-[350px] transition-opacity duration-500 ${
        animateOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="font-medium text-3xl mb-5">Login</h1>
      {error && (
        <div className="mb-4 text-red-600">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="underline text-sm mt-2">
            Try Again
          </button>
        </div>
      )}
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
