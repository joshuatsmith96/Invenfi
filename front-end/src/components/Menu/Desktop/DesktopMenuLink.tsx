import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { Ref } from "react";
import ToolTip from "../../ToolTip";

export type MenuLinkProps = {
  to: string;
  icon: IconDefinition;
  linkTitle: string;
  ref?: Ref<HTMLAnchorElement>;
  isCollapsed?: boolean;
};

const DesktopMenuLink = ({ to, icon, linkTitle, ref, isCollapsed }: MenuLinkProps) => {
  return (
    <ToolTip message={linkTitle}>
      <NavLink
        to={to}
        ref={ref}
        className={({ isActive }) =>
          `
        w-full px-4 py-2 mb-2 rounded transition-all flex items-center
        ${isCollapsed ? "flex-col justify-center gap-1" : "flex-row gap-3"}
        ${isActive ? "bg-[#EEFBFF] text-black" : "text-gray-600 hover:bg-gray-100"}
        `
        }
      >
        <FontAwesomeIcon icon={icon} className="text-lg" />
        {!isCollapsed && <p className="whitespace-nowrap">{linkTitle}</p>}
      </NavLink>
    </ToolTip>
  );
};

export default DesktopMenuLink;
