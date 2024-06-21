import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../hooks";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/account/login" />;
  }

  return children;
};

export default ProtectedRoute;
