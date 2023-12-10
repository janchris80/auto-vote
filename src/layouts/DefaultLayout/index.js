import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react";
import Navbars from "components/elements/Navbars";
import Footer from "components/elements/Footer";
import Sidebar from "components/elements/Sidebar";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {

  const location = useLocation();
  const mainPanel = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <div className="wrapper">
      <ToastContainer />
      <Sidebar />
      <div className="main-panel main-context" ref={mainPanel}>
        <Navbars />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
