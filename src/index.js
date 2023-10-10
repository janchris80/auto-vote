import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/custom.css";

import { AuthProvider } from 'context/AuthProvider';

import AdminLayout from "layouts/AdminLayout.js";
import LandingLayout from "layouts/LandingLayout.js";
import LoginPage from 'pages/LoginPage';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" exact element={<LandingLayout />} /> */}
          <Route path='/*' element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
