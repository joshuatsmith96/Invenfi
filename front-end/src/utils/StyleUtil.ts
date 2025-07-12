export const styleField = (field: HTMLElement, valid: boolean) => {
  if(valid){
    field.classList.remove("border-red-500", "shake");
  } else {
    field.classList.add("border-red-500", "shake")
  }
}