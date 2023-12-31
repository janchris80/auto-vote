import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import Layout from './layouts/DefaultLayout';
import Missing from './components/elements/Missing';
import RequireAuth from './components/wrappers/RequireAuth';
import AuthorizedAccount from './components/wrappers/AuthorizedAccount';
import LoginPage from 'pages/LoginPage';
import DashboardPage from 'pages/DashboardPage';
import UpvotePostPage from 'pages/UpvotePostPage';
import CurationTrailPage from 'pages/CurationTrailPage';
import DownvoteTrailPage from 'pages/DownvoteTrailPage';
import UpvoteCommentPage from 'pages/UpvoteCommentPage';
import ClaimRewardPage from 'pages/ClaimRewardPage';
import FaqPage from 'pages/FaqPage';
import DonationPage from 'pages/DonationPage';
import ContactUsPage from 'pages/ContactUsPage';
import HelpVideoPage from 'pages/HelpVideoPage';
import UserProfileWrapper from 'components/wrappers/UserProfile';

const App = () => {
  useEffect(() => {
    document.title = 'Auto.Vote';
  }, []);

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
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Check if you authorize the posting for this app */}
          <Route element={<AuthorizedAccount />}>
            <Route path="/upvote-post" element={<UpvotePostPage />} />

            <Route path="/curation-trail" element={<CurationTrailPage />} />

            <Route path="/downvote-trail" element={<DownvoteTrailPage />} />

            <Route path="/:username/:trail" element={<UserProfileWrapper />} />

            <Route path="/upvote-comment" element={<UpvoteCommentPage />} />
            <Route path="/claim-reward" element={<ClaimRewardPage />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;