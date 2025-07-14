interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorResponse = await res.json().catch(() => null);
          const errorMessage = errorResponse?.message || "Logout failed";
          throw new Error(errorMessage);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Logout response:", data);
        onLogout();
      })
      .catch((err) => {
        console.error(err);
        alert(`Failed to logout: ${err.message}`);
      });
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
