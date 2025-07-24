import type { ReactNode } from "react";
import DashboardMenu from "../components/Menu/Desktop/DashboardMenu";
import MobileDashboardMenu from "../components/Menu/Mobile/MobileDashboardMenu";

type DashboardProps = {
  onLogout: () => void;
  children: ReactNode;
};

const Dashboard = ({ onLogout, children }: DashboardProps) => {
  return (
    <div className="relative bg-[#f5f5f5] flex flex-row h-screen">
      <DashboardMenu onLogout={onLogout} />
      <MobileDashboardMenu />
      <div className="dashboard-view-box w-full p-10 px-20 !overflow-scroll max-xl:p-5">{children}</div>
    </div>
  );
};

export default Dashboard;
