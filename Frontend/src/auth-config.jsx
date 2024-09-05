import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    // This is the only mandatory field
    clientId: "",
    // Replace the placeholder with tenant subdomain
    authority: "",
    // Points to window.location.origin. This URI needs to be registered on Azure Portal/App Registration
    redirectUri: "/",
    // Indicates the page to navigate to after logout
    postLogoutRedirectUri: "/",
    // If "true", will navigate back to the original request location before processing the auth code response
    navigateToLoginRequestUrl: false,
  },
  cache: {
    // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs
    cacheLocation: "sessionStorage",
    // Set this to "true" if having issues on IE11 or Edge
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["user.read"],
};
