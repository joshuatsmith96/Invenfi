import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../../LogoutButton";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/callAPI";
import { useState } from "react";
import DesktopMenuLink from "./DesktopMenuLink";
import { MenuLinks } from "../../../views/DashboardView/LinkSpecs";

type DashboardProps = {
  onLogout: () => void;
};

const DashboardMenu = ({ onLogout }: DashboardProps) => {
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        await callAPI.logout();
        onLogout();
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
        <div className="loader mb-3"></div>
        <p>Logging out...</p>
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-300 ease-in-out bg-white shadow-xl shadow-[#bbbbbb] h-[100vh] p-5 pt-10
        flex flex-col justify-between items-start relative
        ${isCollapsed ? "!w-[100px]" : "w-[500px]"}`}
    >
      <div className="w-full">
        <FontAwesomeIcon
          onClick={handleToggleMenu}
          icon={faChevronCircleLeft}
          className={`transition-transform duration-300 text-[#F3A0A0] rounded-full text-3xl absolute z-12 top-11 right-[-14px] cursor-pointer
            ${isCollapsed ? "rotate-180" : ""}`}
        />
        <h2
          className={`flex items-center gap-3 text-2xl font-bold transition-all
            ${isCollapsed ? "flex-col" : "flex-row"}`}
        >
          <FontAwesomeIcon icon={faClipboardCheck} />
          {!isCollapsed && <span>Invenfi</span>}
        </h2>

        <div className="my-10 flex flex-col overflow-hidden">
          {!isCollapsed && (
            <h2 className="text-xl font-bold mb-10">Menu</h2>
          )}
          <div className="flex flex-col">
            {MenuLinks.map((link) => (
              <DesktopMenuLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                linkTitle={link.linkTitle}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
      </div>

      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default DashboardMenu;
