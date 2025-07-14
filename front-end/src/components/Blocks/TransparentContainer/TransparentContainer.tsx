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
      className={`hidden bg-[#ffffffc2] p-10 z-2 rounded-xl flex flex-col items-center shadow-md ${formSize === 2 ? "w-[65%] max-md:h-[70%] max-md:w-full max-lg:overflow-scroll max-lg:overflow-x-auto max-lg:shadow-none max-lg:h-[90%]" : "w-[450px] max-[480px]:w-[350px]"}`}
      ref={ref}
    >
        {children}
    </div>
  );
};

export default TransparentContainer;
