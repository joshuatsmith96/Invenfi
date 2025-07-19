import type { MenuLinkProps } from "../../components/Menu/Desktop/DesktopMenuLink"
import { faSitemap, faBox, faChartArea } from "@fortawesome/free-solid-svg-icons"

export const MenuLinks: MenuLinkProps[] = [
    {
        to: "/",
        icon: faSitemap,
        linkTitle: "Dashboard"
    },
    {
        to: "/inventory",
        icon: faBox,
        linkTitle: "Inventory"
    },
    {
        to: "/reports",
        icon: faChartArea,
        linkTitle: "Reports"
    }
]