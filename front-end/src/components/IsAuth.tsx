import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


type IsAuthType = {
  isLoggedIn: boolean;
  children: ReactNode;
};

const IsAuth = ({ isLoggedIn, children }: IsAuthType) => {
  const location = useLocation();
  const currentPathname = location.pathname;

  if (isLoggedIn) {
    return <>{children}</>;
  } else if (isLoggedIn === false && currentPathname != "/registration") {
    return <Navigate to="/login" replace />;
  }
};

export default IsAuth;
