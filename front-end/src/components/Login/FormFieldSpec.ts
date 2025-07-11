import type { InputField } from "../Blocks/Form/FieldForm"

export const FormFieldSpec: InputField = [
    {
      id: "login-username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
    },
    {
      id: "login-password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    }
]