
import { useEffect, useRef, useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import sidebarImage from "assets/img/sidebar-3.jpg";
import PrivateRoute from 'hooks/PrivateRoute';
import FaqPage from 'pages/FaqPage';
import DashboardPage from 'pages/DashboardPage';
import HomePage from 'pages/HomePage';
import FanbasePage from 'pages/FanbasePage';
import CurationTrailPage from 'pages/CurationTrailPage';
import DownvoteTrailPage from 'pages/DownvoteTrailPage';
import SchedulePostPage from 'pages/SchedulePostPage';
import UpvoteCommentPage from 'pages/UpvoteCommentPage';
import ClaimRewardPage from 'pages/ClaimRewardPage';
import NotificationPage from 'pages/NotificationPage';
import DonationPage from 'pages/DonationPage';
import LoginPage from 'pages/LoginPage';
import BodyStyle from './BodyStyle';

export default function AdminLayout() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("red");
  const [hasImage, setHasImage] = useState(false);
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
    <>
      <BodyStyle className="no-background-image" />
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <PrivateRoute path="/home" component={HomePage} />
              <PrivateRoute path="/dashboard" component={DashboardPage} />
              <Route path="/faq" component={FaqPage} />
              <Route path="/donation" component={DonationPage} />
              <PrivateRoute path="/fanbase" component={FanbasePage} />
              <PrivateRoute path="/curation-trail" component={CurationTrailPage} />
              <PrivateRoute path="/downvote-trail" component={DownvoteTrailPage} />
              <PrivateRoute path="/schedule-posts" component={SchedulePostPage} />
              <PrivateRoute path="/upvote-comments" component={UpvoteCommentPage} />
              <PrivateRoute path="/claim-rewards" component={ClaimRewardPage} />
              <PrivateRoute path="/notifications" component={NotificationPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
