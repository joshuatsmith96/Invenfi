import type { InputFieldArray } from "../../components/Blocks/Form/FieldForm"

export const FormFieldSpec: InputFieldArray = [
    {
      id: "login-username",
      label: "Username",
      type: "user",
      placeholder: "Enter your username",
      required: true
    },
    {
      id: "login-password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true
    }
]