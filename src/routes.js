/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-home",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-user",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/curation-trail",
    name: "Curation Trail",
    icon: "pe-7s-angle-up-circle",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/downvote-trail",
    name: "Downvote Trail",
    icon: "pe-7s-angle-down-circle",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/fanbase",
    name: "Fanbase",
    icon: "pe-7s-like",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/schedule-posts",
    name: "Schedule Posts",
    icon: "pe-7s-date",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/upvote-comments",
    name: "Upvote Comments",
    icon: "pe-7s-comment",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/claim-rewards",
    name: "Claim Rewards",
    icon: "pe-7s-wallet",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Notifications",
    icon: "pe-7s-back-2",
    component: Dashboard,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
];

export default dashboardRoutes;
