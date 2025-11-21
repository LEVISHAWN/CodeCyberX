import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';

/*
  Top-level application component

  Responsibilities:
  - Provide cross-cutting providers (AuthProvider) and context for the whole
    application.
  - Render the routing layer which maps URLs to pages/components.

  Notes for developers:
  - Add other global providers here (e.g., Redux Provider, ThemeProvider,
    ErrorReportingProvider) so they wrap the whole app.
  - Keep this file focused on composition. Avoid adding business logic here.
*/
function App() {
  return (
    /*
      AuthProvider ensures any component in the subtree can access the
      authenticated user state and auth helpers (signIn, signOut, etc.).
    */
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
