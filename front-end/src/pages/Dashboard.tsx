import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

type DashboardProps = {
  onLogout: () => void;
};

const Dashboard = ({ onLogout }: DashboardProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton onLogout={handleLogout} />
      {/* rest of dashboard */}
    </div>
  );
};

export default Dashboard;
