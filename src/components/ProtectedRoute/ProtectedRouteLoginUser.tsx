import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../hooks";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteLoginUser: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteLoginUser;
