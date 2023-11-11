import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/Layout';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import DashboardPage from 'pages/DashboardPage';
import FanbasePage from 'pages/FanbasePage';
import CurationTrailPage from 'pages/CurationTrailPage';
import DownvoteTrailPage from 'pages/DownvoteTrailPage';
import SchedulePostPage from 'pages/SchedulePostPage';
import UpvoteCommentPage from 'pages/UpvoteCommentPage';
import ClaimRewardPage from 'pages/ClaimRewardPage';
import NotificationPage from 'pages/NotificationPage';
import FaqPage from 'pages/FaqPage';
import DonationPage from 'pages/DonationPage';
import ContactUsPage from 'pages/ContactUsPage';
import HelpVideoPage from 'pages/HelpVideoPage';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/donations" element={<DonationPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/help-video" element={<HelpVideoPage />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
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

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;