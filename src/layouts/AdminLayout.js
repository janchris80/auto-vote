
import { useEffect, useRef } from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
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
import { AuthProvider } from 'context/AuthProvider';
import Auth from 'pages/Auth';

export default function AdminLayout() {
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
    <AuthProvider>
      <BodyStyle className="no-background-image" />
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel main-context" ref={mainPanel}>
          <AdminNavbar />
          <div className="content bg-white">
            <Routes>

              <Route element={<Auth allowedRoles={['user']} />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/fanbase" element={<FanbasePage />} />
                <Route path="/curation-trail" element={<CurationTrailPage />} />
                <Route path="/downvote-trail" element={<DownvoteTrailPage />} />
                <Route path="/schedule-posts" element={<SchedulePostPage />} />
                <Route path="/upvote-comments" element={<UpvoteCommentPage />} />
                <Route path="/claim-rewards" element={<ClaimRewardPage />} />
                <Route path="/notifications" element={<NotificationPage />} />
              </Route>

              <Route path="/faq" element={<FaqPage />} />
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/login" element={<LoginPage />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}
