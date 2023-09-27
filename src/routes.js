import ClaimRewardPage from 'pages/ClaimRewardPage';
import CurationTrailPage from 'pages/CurationTrailPage';
import DashboardPage from 'pages/DashboardPage';
import DownvoteTrailPage from 'pages/DownvoteTrailPage';
import FanbasePage from 'pages/FanbasePage';
import FaqPage from 'pages/FaqPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import NotificationPage from 'pages/NotificationPage';
import SchedulePostPage from 'pages/SchedulePostPage';
import UpvoteCommentPage from 'pages/UpvoteCommentPage';

export const protectedRoute = [
  {
    path: '/home',
    name: 'Home',
    icon: 'pe-7s-home',
    component: HomePage,
    protected: true,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'pe-7s-user',
    component: DashboardPage,
    protected: true,
  },
  {
    path: '/curation-trail',
    name: 'Curation Trail',
    icon: 'pe-7s-angle-up-circle',
    component: CurationTrailPage,
    protected: true,
  },
  {
    path: '/downvote-trail',
    name: 'Downvote Trail',
    icon: 'pe-7s-angle-down-circle',
    component: DownvoteTrailPage,
    protected: true,
  },
  {
    path: '/fanbase',
    name: 'Fanbase',
    icon: 'pe-7s-like',
    component: FanbasePage,
    protected: true,
  },
  {
    path: '/schedule-posts',
    name: 'Schedule Posts',
    icon: 'pe-7s-date',
    component: SchedulePostPage,
    protected: true,
  },
  {
    path: '/upvote-comments',
    name: 'Upvote Comments',
    icon: 'pe-7s-comment',
    component: UpvoteCommentPage,
    protected: true,
  },
  {
    path: '/claim-rewards',
    name: 'Claim Rewards',
    icon: 'pe-7s-wallet',
    component: ClaimRewardPage,
    protected: true,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'pe-7s-bell',
    component: NotificationPage,
    protected: true,
  },
  {
    path: '/logout',
    name: 'Logout',
    icon: 'pe-7s-back-2',
    component: DashboardPage,
    upgrade: true,
    protected: true,
  },
];

export const notProtectedRoute = [
  {
    path: '/faq',
    name: 'FAQ',
    icon: 'pe-7s-home',
    component: FaqPage,
    protected: false,
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'pe-7s-home',
    component: LoginPage,
    protected: false,
  },
];