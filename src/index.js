import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { AuthProvider } from 'hooks/AuthContext';

import AdminLayout from "layouts/AdminLayout.js";
import LandingLayout from "layouts/LandingLayout.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <LandingLayout {...props} />} />
        <AdminLayout />
      </Switch>
    </BrowserRouter>
  </AuthProvider>
);
