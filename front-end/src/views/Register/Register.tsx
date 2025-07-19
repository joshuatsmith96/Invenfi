import { forwardRef, useRef, useState } from "react";
import type { RefObject, ForwardedRef } from "react";

import { FormFieldSpec } from "./FormFieldSpec";
import type { ValuesMap } from "../../components/Blocks/Form/FieldForm";
import FieldForm from "../../components/Blocks/Form/FieldForm";
import TransparentContainer from "../../components/Blocks/TransparentContainer/TransparentContainer";
import { isValid } from "../../utils/IsValid";
import Button from "../../components/Button";

import { callAPI } from "../../utils/callAPI";

type RegisterProps = {
  loginRef: RefObject<HTMLDivElement | null>;
};

const Register = forwardRef<HTMLDivElement, RegisterProps>(function Register(
  { loginRef },
  ref: ForwardedRef<HTMLDivElement>
) {
  const fieldDataRef = useRef<ValuesMap>({});
  const formRef = useRef<HTMLDivElement>(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const retrieveFormData = (data: ValuesMap) => {
    fieldDataRef.current = data;
  };

  const registerUser = async () => {
    const valid = isValid({
      formRef,
      fieldData: fieldDataRef.current,
      FormFieldSpec,
    });

    if (!valid) {
      console.log("ENTIRE FORM IS NOT VALID");
      return;
    }

    const data = fieldDataRef.current;
    const dataToSend = {
      company_name: data["registration-company-name"].value,
      company_type: data["registration-company-type"].value,
      first_name: data["registration-first-name"].value,
      last_name: data["registration-last-name"].value,
      email: data["registration-email"].value,
      username: data["registration-username"].value,
      password: data["registration-verify-password"].value,
    };

    try {
      const response = await callAPI.register(dataToSend);
      console.log("Registration success:", response);
      setRegistrationComplete(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
        alert(`Registration failed: ${error.message}`);
      } else {
        console.error("Registration failed with unknown error:", error);
        alert("Registration failed: Unknown error");
      }
    }
  };

  const goToLogin = () => {
    const registerForm = (ref as RefObject<HTMLDivElement>)?.current;
    const loginForm = loginRef.current;

    if (registerForm && loginForm) {
      registerForm.classList.remove("fade-in-right");
      registerForm.classList.add("fade-out-left");
      setTimeout(() => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        loginForm.classList.remove("fade-out-left");
        loginForm.classList.add("fade-in-right");
      }, 300);
    }
  };

  return (
    <TransparentContainer ref={ref} formSize={2} className="overflow-x-scroll h-[65vh]">
      {!registrationComplete ? (
        <>
          <h1 className="font-medium text-3xl mb-5">Register</h1>

          <FieldForm
            formSize={2}
            containerRef={formRef}
            inputParams={FormFieldSpec}
            sendInfo={retrieveFormData}
          />

          <div className="flex flex-row w-full gap-10 max-md:gap-2">
            <Button
              onClick={registerUser}
              bgColor="bg-gradient-to-r from-[#5E6AEE] to-[#CF8EEB]"
            >
              Sign Up
            </Button>

            <Button onClick={goToLogin} color="#434343" thin>
              Go to Login
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-3xl font-semibold text-green-600 mb-6">
            Registration Complete!
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            You can now log in with your new account.
          </p>
          <Button onClick={goToLogin} bgColor="bg-gradient-to-r from-[#5E6AEE] to-[#CF8EEB]">
            Go to Login
          </Button>
        </div>
      )}
    </TransparentContainer>
  );
});

export default Register;
