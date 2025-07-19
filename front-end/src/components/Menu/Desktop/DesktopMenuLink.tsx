import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { Ref } from "react";

export type MenuLinkProps = {
  to: string;
  icon: IconDefinition;
  linkTitle: string;
  ref?: Ref<HTMLAnchorElement>;
};

const DesktopMenuLink = ({ to, icon, linkTitle, ref }: MenuLinkProps) => {
  return (
    <NavLink
      to={to}
      ref={ref}
      className={({ isActive }) =>
        `w-full flex flex-row items-center p-3 text-xl rounded-md transition-colors gap-2 ${
          isActive ? "bg-[#EEFBFF] text-black" : "inactive-link text-gray-600"
        }`
      }
    >
      <FontAwesomeIcon icon={icon} />
      <p>{linkTitle}</p>
    </NavLink>
  );
};


export default DesktopMenuLink;
