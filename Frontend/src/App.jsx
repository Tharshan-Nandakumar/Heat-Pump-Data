/*
//import { useState, useEffect } from "react";
import Inputs from "./Components/Inputs/Inputs";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { loginRequest } from "./auth-config";

const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({ ...loginRequest, prompt: "create" })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => instance.logout();

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <div>
            <div style={{ padding: "10px" }}>
              <Inputs />
            </div>
            <p>hi</p>; <button onClick={handleLogout}>Log out</button>
          </div>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect}>Log in</button>
      </UnauthenticatedTemplate>
    </div>
  );
};

function App({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <WrappedView />
    </MsalProvider>
  );
}

export default App;
        
          
          
        
        */

import "./App.css";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { loginRequest } from "./Components/Auth/auth-config";
import Inputs from "./Components/Inputs/Inputs";
import Map from "./Components/Map/map";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rendesco from "./Components/Images/Rendesco.png";
import Navbar from "./Components/Navbar/Navbar";
import Wizard from "./Components/Wizard/Wizard";

function App() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "select_account",
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
    ///window.location.reload();
  };

  const styles = {
    fontFamily: "'Segoe UI', monospace",
  };

  return (
    <div className="App" style={styles}>
      <AuthenticatedTemplate>
        {activeAccount ? (
          <>
            <div style={{ padding: "0" }}>
              <Navbar handleLogoutRedirect={handleLogoutRedirect} />
              <Router>
                <Routes>
                  <Route path="/" element={<Map />} />
                  <Route path="live_data/:site" element={<Inputs />} />
                  <Route path="diagnostic_wizard" element={<Wizard />} />
                </Routes>
              </Router>
            </div>
          </>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div style={{ overflow: "hidden" }}>
          <svg
            height="70vh"
            viewBox="0 0 1070 1905"
            fill="none"
            overflow="hidden"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              scale: "8",
              position: "fixed", // Place it in the background
              top: "20%", // Adjust as needed
              left: "120%", // Adjust as needed
              opacity: 0.2, // Make it faint
              zIndex: -1, // Ensure it's in the background
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <path
              d="M650 1503V0L0 799.5L650 1503Z"
              fill="#299F76"
              style={{ overflow: "hidden" }}
            />
            <path
              d="M650 310L19 1106.56L650 1801"
              stroke="#CCCCCC"
              strokeWidth="9"
              style={{ overflow: "hidden" }}
            />
          </svg>
        </div>
        <img id="logo_main" src={Rendesco} alt="Rendesco logo" />
        <h1 className="title" style={{ margin: " 23% 5% 20px 5%" }}>
          Operations and Maintenance
        </h1>
        <button
          onClick={handleLoginRedirect}
          style={{ margin: "3% auto", width: "120px" }}
        >
          <img
            src="https://cdn.prod.website-files.com/660e750b3c8e9f9fcab9f476/660e7bbcc761116366a6fe1e_Rendesco%20logo%20symbol.webp"
            loading="lazy"
            width="20%"
            height="20%"
            alt="A green and white logo Rendesco Heat Support"
          />
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1rem"
            viewBox="0 0 448 512"
          >
            <path
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              fill="#299f76"
            ></path>
          </svg>
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
}

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export default App;
