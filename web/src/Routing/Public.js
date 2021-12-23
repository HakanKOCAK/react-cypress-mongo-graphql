import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react'
import { useAuth } from "../auth/AuthProvider";

//This the public route only accessible if user is not authenticated
const PublicRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Box h="100%">
      {children}
    </Box>
  }

  const from = location.state && location.state.from ? location.state.from : '/restaurants';
  //redirectTo is to set which route should user forwarded if not authenticated
  return (
    <Box h="100%">
      <Navigate to={from} state={{ from: location }} />
    </Box>
  );
};

PublicRoute.propTypes = {
  redirectTo: PropTypes.string
};

export default PublicRoute;
