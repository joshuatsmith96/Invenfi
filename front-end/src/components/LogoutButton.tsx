import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LogoutButtonProps = {
  onLogout: () => void;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button onClick={onLogout} className="text-xl hover:cursor-pointer"><FontAwesomeIcon icon={faRightFromBracket}/> Logout</button>
  );
};

export default LogoutButton;
