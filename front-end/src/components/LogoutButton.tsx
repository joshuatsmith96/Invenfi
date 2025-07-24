import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LogoutButtonProps = {
  onLogout: () => void;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button onClick={onLogout} className="text-lg hover:cursor-pointer text-red-500"><FontAwesomeIcon icon={faRightFromBracket}/> <span className="max-sm:hidden">Logout</span></button>
  );
};

export default LogoutButton;
