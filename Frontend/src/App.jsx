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

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <>
            <div style={{ padding: "10px" }}>
              <button
                onClick={handleLogoutRedirect}
                style={{ margin: " 10px 0 0 85%", width: "10%" }}
              >
                Logout
              </button>
              <Inputs />
            </div>
          </>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1 className="title" style={{ margin: " 10% 5% 20px 5%" }}>
          Heat Pump Data
        </h1>
        <button
          onClick={handleLoginRedirect}
          style={{ margin: " 10px 5% 5% 5%", width: "90%" }}
        >
          Login
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
