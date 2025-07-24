import DesktopMenuLink from "../Desktop/DesktopMenuLink";
import LogoutButton from "../../LogoutButton";
import { MenuLinks } from "../../../views/DashboardView/LinkSpecs";

const MobileDashboardMenu = () => {
    return(
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
            <LogoutButton onClick={() => {console.log("LOG OUT FUNCTION HERE")}}/>
            </div>
        </div>
    )
}

export default MobileDashboardMenu;