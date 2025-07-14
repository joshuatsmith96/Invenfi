// import { faBuilding, faMailBulk, faPerson } from "@fortawesome/free-solid-svg-icons"
// import type { InputField } from "../Blocks/Form/FieldForm"

// export const FormFieldSpec: InputField = [
//     {
//       id: "registration-company-name",
//       label: "Company Name",
//       type: "custom",
//       customIcon: faBuilding,
//       placeholder: "Enter your company name",
//       required: true
//     },
//     {
//       id: "registration-company-type",
//       type: "dropdown",
//       options: [
//         {value: "Restaurant", label: "Restaurant"},
//         {value: "E-Commerce", label: "E-Commerce"},
//         {value: "Other", label: "Other"},
//       ],
//       label: "Company Type",
//       placeholder: "Choose your company type (this will be a dropdown)",
//       required: false
//     },
//     {
//       id: "registration-first-name",
//       label: "First Name",
//       type: "custom",
//       customIcon: faPerson,
//       placeholder: "Enter your first name",
//       required: true
//     },
//     {
//       id: "registration-last-name",
//       label: "Last Name",
//       type: "custom",
//       customIcon: faPerson,
//       placeholder: "Enter your last name",
//       required: true
//     },
//     {
//       id: "registration-email",
//       label: "Email",
//       type: "custom",
//       customIcon: faMailBulk,
//       placeholder: "Enter your email",
//       required: true
//     },
//     {
//       id: "registration-user-name",
//       label: "Username",
//       type: "user",
//       placeholder: "Enter your username",
//       required: true
//     },
//     {
//       id: "registration-password",
//       label: "Password",
//       placeholder: "Enter your Password",
//       type: 'password',
//       required: true
//     },
//     {
//       id: "registration-verify-password",
//       label: "Verify Password",
//       placeholder: "Verify your password",
//       type: 'password',
//       required: true
//     },
// ]


import { faBuilding, faFolder, faMailBulk, faPerson } from "@fortawesome/free-solid-svg-icons"
import type { InputField } from "../Blocks/Form/FieldForm"

export const FormFieldSpec: InputField = [
    {
      id: "registration-company-name",
      label: "Company Name",
      type: "custom",
      customIcon: faBuilding,
      placeholder: "Enter your company name",
      required: true
    },
    {
      id: "registration-company-type",
      label: "Company Type",
      type: "custom",
      customIcon: faFolder,
      placeholder: "Furniture, Clothing, Electronics, Etc.",
      required: true
    },
    {
      id: "registration-first-name",
      label: "First Name",
      type: "custom",
      customIcon: faPerson,
      placeholder: "Enter your first name",
      required: true
    },
    {
      id: "registration-last-name",
      label: "Last Name",
      type: "custom",
      customIcon: faPerson,
      placeholder: "Enter your last name",
      required: true
    },
    {
      id: "registration-email",
      label: "Email",
      type: "custom",
      customIcon: faMailBulk,
      placeholder: "Enter your email address",
      required: true
    },
    {
      id: "registration-username",
      label: "Username",
      type: "user",
      placeholder: "Enter your username",
      required: true
    },
    {
      id: "registration-password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true
    },
    {
      id: "registration-verify-password",
      label: "Password",
      type: "password",
      placeholder: "Verify your password",
      required: true
    }
]