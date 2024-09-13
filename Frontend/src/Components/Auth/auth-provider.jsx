import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth-config";
import { MsalProvider } from "@azure/msal-react";
export const AuthProvider = ({ children }) => {
  const msalInstance = new PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default function useAuthProvider() {
  return { AuthProvider };
}
