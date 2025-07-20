import { useState, type ReactNode } from "react";
import useScreenWidth from "../utils/ScreenSize";
import { mobileSize } from "../utils/universalExports";

export type ToolTipType = {
  text?: string;
  children?: ReactNode;
  customPosition?: string;
};

const ToolTip = ({ text, children, customPosition }: ToolTipType) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const screenSize = useScreenWidth();

  const onHover = (direction: string) => {
    if (screenSize <= mobileSize) {
      if (direction === "on") {
        setShowToolTip(true);
      } else if (direction === "out") {
        setShowToolTip(false);
      }
    }
  };

  return (
    <div onMouseOver={() => onHover("on")} onMouseOut={() => onHover("out")}>
      {children}
      <span
        className={`absolute right-[${customPosition}] bg-gray-400 text-white p-2 duration-150 delay-150 rounded-md ${
          showToolTip ? "opacity-75" : "opacity-0"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default ToolTip;
