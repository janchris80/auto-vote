import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react";
import Header from "components/Navbars/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

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
      <Sidebar />
      <div className="main-panel main-context" ref={mainPanel}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
