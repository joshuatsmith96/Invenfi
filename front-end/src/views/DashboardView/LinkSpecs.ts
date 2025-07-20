import type { MenuLinkProps } from "../../components/Menu/Desktop/DesktopMenuLink"
import { faSitemap, faBox, faChartArea } from "@fortawesome/free-solid-svg-icons"

export const MenuLinks: MenuLinkProps[] = [
    {
        to: "/",
        icon: faSitemap,
        linkTitle: "Dashboard",
        toolTipData: {
            customPosition: "-90px"
        }
    },
    {
        to: "/inventory",
        icon: faBox,
        linkTitle: "Inventory",
        toolTipData: {
            customPosition: "-100px"
        }
    },
    {
        to: "/reports",
        icon: faChartArea,
        linkTitle: "Reports",
        toolTipData: {
            customPosition: "-100px"
        }
    }
]