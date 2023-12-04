import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/pe-icon-7-stroke.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/custom.css";

import App from 'App';

import { store, persistor } from 'store/store'; // Import store and persistor

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
