import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoaderSpinner from "../Shared/LoaderSpinner";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default AdminRoute;
