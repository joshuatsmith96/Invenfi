import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LogoutButtonProps = {
  onLogout: () => void;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button onClick={onLogout} className="text-lg hover:cursor-pointer"><FontAwesomeIcon icon={faRightFromBracket}/> Logout</button>
  );
};

export default LogoutButton;
