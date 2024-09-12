//import { useState, useEffect } from "react";
//import Inputs from "./Components/Inputs/Inputs";

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
            Authenticated Successfully...
            <div>
              Click here to logout
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect}>Sign up</button>
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
/*
<div style={{ padding: "10px" }}>
<Inputs />
</div> //replace successfully above ??
*/
