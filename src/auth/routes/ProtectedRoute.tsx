// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { TokenService } from "../services/token.service";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = !!TokenService.getAccessToken();

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
