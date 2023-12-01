import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorizedAccount = () => {
  const location = useLocation();
  const { isAuthorizeApp } = useSelector((state) => state.auth);

  return (
    isAuthorizeApp
      ? <Outlet />
      : <Navigate to="/dashboard" state={{ from: location }} replace />
  );
}

export default AuthorizedAccount;