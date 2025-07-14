import type { ReactNode } from "react";
import type { ForwardedRef } from "react";

type TransparentContainerType = {
    ref?: ForwardedRef<HTMLDivElement>,
    children: ReactNode,
    formSize: number
}

const TransparentContainer = ({ref, children, formSize}: TransparentContainerType) => {
  return (
    <div
      className={`hidden bg-[#ffffffc2] p-10 z-2 rounded-xl flex flex-col items-center shadow-md ${formSize === 2 ? "w-[65%] max-md:h-[70%] max-md:w-full max-md:overflow-scroll max-md:overflow-x-auto max-md:shadow-none" : "w-[450px] max-[480px]:w-[350px]"}`}
      ref={ref}
    >
        {children}
    </div>
  );
};

export default TransparentContainer;
