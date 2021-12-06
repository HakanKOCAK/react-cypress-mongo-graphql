import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types';
import { useAuth } from "../auth/AuthProvider";

//This the public route only accessible if user is not authenticated
const PublicRoute = ({ children, redirectTo = '/home' }) => {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    return children;
  }

  //redirectTo is to set which route should user forwarded if not authenticated
  return <Navigate to={redirectTo} state={{ from: location }} />;
};

PublicRoute.propTypes = {
  redirectTo: PropTypes.string
};

export default PublicRoute;
