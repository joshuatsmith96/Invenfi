import { styleField } from "./StyleUtil";
import type { InputField, InputFieldArray } from "../components/Blocks/Form/FieldForm";
import type { ValuesMap } from "../components/Blocks/Form/FieldForm";

type IsValidType = {
  formRef: React.RefObject<HTMLDivElement | null>;
  fieldData: ValuesMap;
  FormFieldSpec: InputFieldArray;
};

export const isValid = ({ formRef, fieldData, FormFieldSpec }: IsValidType) => {
  const allFields = formRef.current?.children;
  const inputsArray = allFields ? Array.from(allFields) : [];
  const arrayOfInputs = inputsArray.map((field) => {
    return field.children[1].children[1];
  });

  const validArray: Array<boolean> = [];

  arrayOfInputs.map((input, count) => {
    const valid = fieldData[input.id] != undefined ? fieldData[input.id].valid : false;
    const field = allFields ? allFields[count].children[1] : undefined;
    const isRequired = FormFieldSpec.find((item: InputField) => item.id === input.id)?.required;

    if (!isRequired) {
      validArray.push(true);
    } else {
      console.log(fieldData[input.id]);
      if (fieldData[input.id] && valid) {
        console.log("VALID DATA", fieldData);
        validArray.push(true);
        styleField(field, true);
      } else {
        console.log("NOT VALID");
        validArray.push(false);
        styleField(field, false);
      }
    }
  });

  return validArray.includes(false) ? false : true;
};
