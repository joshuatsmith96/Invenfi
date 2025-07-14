import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    // Redirect to login page after logout
    navigate("/login", { replace: true });
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default Dashboard;
