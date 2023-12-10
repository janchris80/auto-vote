import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthorizedAccount = () => {
  const location = useLocation();
  const { isAuthorizeApp } = useSelector((state) => state.auth);

  const notify = () => toast.warn("You need to authorize this app to use this feature.", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    if (!isAuthorizeApp) {
      notify();
    }
  }, [isAuthorizeApp])

  return (
    isAuthorizeApp
      ? <Outlet />
      : <Navigate to="/dashboard" state={{ from: location }} replace />
  );
}

export default AuthorizedAccount;