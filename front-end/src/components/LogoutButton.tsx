type LogoutButtonProps = {
  onLogout: () => void;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button onClick={onLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
