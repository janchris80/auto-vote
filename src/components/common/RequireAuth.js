import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    isLoggedIn
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;