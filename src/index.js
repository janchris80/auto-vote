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
import { KeychainSDK } from "keychain-sdk";

import { AuthProvider } from 'context/AuthProvider';

import AdminLayout from "layouts/AdminLayout.js";
import LoginPage from 'pages/LoginPage';

const root = ReactDOM.createRoot(document.getElementById("root"));

const keychain = new KeychainSDK(window, { rpc: 'https://rpc.d.buzz/' });
const isKeychainInstalled = await keychain.isKeychainInstalled();

console.log(isKeychainInstalled);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" exact element={<LandingLayout />} /> */}

          {/* <Route exact path="/login" element={<LoginPage />} /> */}
          <Route path='/*' element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
