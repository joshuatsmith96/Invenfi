import type { ReactNode } from "react";
import DashboardMenu from "../components/Menu/Desktop/DashboardMenu";

type DashboardProps = {
  onLogout: () => void;
  children: ReactNode;
};

const Dashboard = ({ onLogout, children }: DashboardProps) => {
  return (
    <div className="relative bg-[#f5f5f5] flex flex-row">
      <DashboardMenu onLogout={onLogout} />
      <div className="dashboard-view-box w-full p-10 px-20">{children}</div>
    </div>
  );
};

export default Dashboard;
