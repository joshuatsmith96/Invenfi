import { forwardRef, useRef } from "react";
import { FormFieldSpec } from "./FormFieldSpec";
import type { ValuesMap } from "../../components/Blocks/Form/FieldForm";
import FieldForm from "../../components/Blocks/Form/FieldForm";
import TransparentContainer from "../../components/Blocks/TransparentContainer/TransparentContainer";
import { isValid } from "../../utils/IsValid";
import Button from "../../components/Button";

const Register = forwardRef<HTMLDivElement>((_, ref) => {
  const fieldDataRef = useRef<ValuesMap>({});
  const formRef = useRef<HTMLDivElement>(null);

  const retrieveFormData = (data: ValuesMap) => {
    fieldDataRef.current = data;
  };

  const registerUser = () => {
    const valid = isValid({
      formRef,
      fieldData: fieldDataRef.current,
      FormFieldSpec,
    });

    if (valid) {
      console.log("ENTIRE FORM IS VALID");
      console.log(fieldDataRef.current);
    } else {
      console.log("ENTIRE FORM IS NOT VALID");
      console.log(fieldDataRef.current);
    }
  };

  return (
    <TransparentContainer ref={ref} formSize={2}>
      <h1 className="font-medium text-3xl mb-5">Register</h1>
      <FieldForm
        formSize={2}
        containerRef={formRef}
        inputParams={FormFieldSpec}
        sendInfo={retrieveFormData}
      />
      <div className="flex flex-row w-full gap-10">
        <Button onClick={registerUser} bgColor="bg-gradient-to-r from-[#5E6AEE] to-[#CF8EEB]">Sign Up</Button>
        <Button onClick={registerUser} color="#434343" thin>Already have an account? Login</Button>
      </div>
    </TransparentContainer>
  );
});

export default Register;
