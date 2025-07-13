import type { MouseEvent } from "react";
import type { RefObject } from "react";

type RegisterSectionType = {
  registerRef: RefObject<HTMLDivElement | null>
}

const RegisterSection = ({registerRef}: RegisterSectionType) => {

  const goToRegistration = (e: MouseEvent<HTMLSpanElement>) => {
    const eventElement = e.target as Element;
    const loginContainer = eventElement.parentNode?.parentNode?.parentNode as Element;
    const registerForm = registerRef.current;

    loginContainer.classList.add("fade-out-left");
    setTimeout(() => {
      loginContainer.classList.add("hidden");
      registerForm?.classList.remove("hidden");
      registerForm?.classList.add("fade-in-right");
    }, 300)
  };

  return (
    <div className="bg-[#ffffffc2] p-5 z-2 rounded-2xl flex flex-col items-center shadow-md w-full">
      <p>
        Don't have an account?{" "}
        <span className="text-[#3C7DF5] hover:cursor-pointer" onClick={goToRegistration}>
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default RegisterSection;
