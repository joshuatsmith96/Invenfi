import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { callAPI } from "../utils/callAPI";

type DashboardProps = {
  onLogout: () => void;
};

const Dashboard = ({ onLogout }: DashboardProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    callAPI.logout()
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default Dashboard;
