import type { InputField } from "../Blocks/Form/FieldForm"
import { faBookAtlas } from "@fortawesome/free-solid-svg-icons"

export const FormFieldSpec: InputField = [
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
    },
    {
      id: "test-1",
      label: "Secret Hint",
      type: 'custom',
      placeholder: "Enter a secret hint",
      required: true
    }
]