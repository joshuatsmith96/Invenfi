export const styleField = (field: Element | undefined, valid: boolean) => {
  if(valid){
    field?.classList.remove("border-red-500", "shake");
  } else {
    field?.classList.add("border-red-500", "shake")
  }
}