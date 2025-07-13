import type { InputField } from "../Blocks/Form/FieldForm"

export const FormFieldSpec: InputField = [
    {
      id: "registration-company-name",
      label: "Company Name",
      placeholder: "Enter your company name",
      required: true
    },
    {
      id: "registration-company-type",
      label: "Company Type",
      placeholder: "Choose your company type (this will be a dropdown)",
      required: true
    },
    {
      id: "registration-first-name",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true
    },
    {
      id: "registration-last-name",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true
    },
    {
      id: "registration-email",
      label: "Email",
      placeholder: "Enter your email",
      required: true
    },
    {
      id: "registration-user-name",
      label: "Username",
      placeholder: "Enter your username",
      required: true
    },
    {
      id: "registration-password",
      label: "Password",
      placeholder: "Enter your Password",
      type: 'password',
      required: true
    },
    {
      id: "registration-verify-password",
      label: "Verify Password",
      placeholder: "Verify your password",
      type: 'password',
      required: true
    },
]