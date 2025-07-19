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
import { useRef } from "react";
import { MenuLinks } from "../../../views/DashboardView/LinkSpecs";

type DashboardProps = {
  onLogout: () => void;
};

const DashboardMenu = ({ onLogout }: DashboardProps) => {
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);

  const linksRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuLabelRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<SVGSVGElement | null>(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    const button = buttonRef.current as Element;
    const menu = menuRef.current as Element;
    const title = titleRef.current as Element;
    const titleIcon = title.parentNode as Element;
    const menuLabel = menuLabelRef.current as Element;
    const links = linksRef.current as Element;
    const allLinks = Array.from(links.children);

    allLinks.map((link) => {
      link.children[1].classList.toggle("hidden")
      link.classList.toggle("!flex-col")
      console.log(link)
    });
    titleIcon.classList.toggle("!flex-col")
    menuLabel.classList.toggle("hidden");
    title.classList.toggle("hidden");
    button.classList.toggle("rotate-180");
    menu.classList.toggle("!w-[100px]");
  };

  const onClickHandler = () => {
    if (close) {
      toggleMenu();
      setClose(false);
    } else {
      toggleMenu();
      setClose(true);
    }
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
      <div className="absolute top-0 left-0 w-[100%] h-[100%] flex flex-col items-center justify-center">
        <div className="loader mb-3"></div>
        <p>Logging out...</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-between items-start transition bg-white relative shadow-xl shadow-[#bbbbbb] w-[500px] h-[100vh] p-5 pt-10"
      ref={menuRef}
    >
      <div className="w-full">
        <FontAwesomeIcon
          onClick={onClickHandler}
          icon={faChevronCircleLeft}
          className="transition text-[#F3A0A0] rounded-full text-3xl absolute z-12 top-11 right-[-14px] cursor-pointer"
          ref={buttonRef}
        />
        <h2 className="flex flex-row gap-3 items-center text-3xl font-bold">
          <FontAwesomeIcon icon={faClipboardCheck} />
          <span ref={titleRef}>Invenfi</span>
        </h2>
        <div className="my-10 flex flex-col overflow-hidden">
          <h2 className="text-2xl font-bold mb-10" ref={menuLabelRef}>
            Menu
          </h2>
          <div className="flex flex-col" ref={linksRef}>
            {MenuLinks.map((link) => {
              return (
                <DesktopMenuLink to={link.to} icon={link.icon} linkTitle={link.linkTitle}/>
              )
            })}
          </div>
        </div>
      </div>
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default DashboardMenu;
