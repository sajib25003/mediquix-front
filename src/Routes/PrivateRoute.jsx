import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoaderSpinner from "../Shared/LoaderSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <LoaderSpinner></LoaderSpinner>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} ></Navigate>;
};

export default PrivateRoute;
