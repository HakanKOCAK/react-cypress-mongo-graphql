import { Navigate, useLocation } from "react-router";
import { useAuth } from "../auth/AuthProvider";

//This the private route only accessible if user authenticated
const PrivateRoute = ({ children }) => {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
