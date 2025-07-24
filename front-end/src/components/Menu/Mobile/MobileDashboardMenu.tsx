import DesktopMenuLink from "../Desktop/DesktopMenuLink";
import LogoutButton from "../../LogoutButton";
import { MenuLinks } from "../../../views/DashboardView/LinkSpecs";
import { useState } from "react";
import { callAPI } from "../../../utils/callAPI";
import { useNavigate } from "react-router-dom";

type DashboardProps = {
  onLogout: () => void;
};

const MobileDashboardMenu = ({ onLogout }: DashboardProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="hidden absolute bottom-10 w-full flex-row justify-center items-center max-sm:flex">
      <div className="flex flex-row shadow-md shadow-gray-700 opacity-90 p-3 bg-white justify-evenly items-center gap-4 rounded-full w-3/4">
        {MenuLinks.map((link) => (
          <DesktopMenuLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            linkTitle={link.linkTitle}
            isCollapsed={true}
          />
        ))}
        <LogoutButton onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default MobileDashboardMenu;
