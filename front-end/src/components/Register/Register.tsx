import { forwardRef } from "react";
import { FormFieldSpec } from "./FormFieldSpec";
import type { ValuesMap } from "../Blocks/Form/FieldForm";
import { useRef } from "react";
import FieldForm from "../Blocks/Form/FieldForm";
import TransparentContainer from "../Blocks/TransparentContainer/TransparentContainer";

const Register = forwardRef<HTMLDivElement>((_, ref) => {
  let fieldData: ValuesMap = {};
  const formRef = useRef<HTMLDivElement>(null);

  const retrieveFormData = (data: ValuesMap) => {
    fieldData = data;
  };

  console.log("Register Field Data", fieldData);

  return (
    <TransparentContainer ref={ref} formSize={2}>
      <h1 className="font-medium text-3xl mb-5">Register</h1>
      <FieldForm
        formSize={2}
        containerRef={formRef} // pass the ref here
        inputParams={FormFieldSpec}
        sendInfo={retrieveFormData}
      />
    </TransparentContainer>
  );
});

export default Register;
