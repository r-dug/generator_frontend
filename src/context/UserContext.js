import React from 'react';

export const UserContext = React.createContext({
  user: null,  // Assume a null user by default
  setAuthState: () => {},  // Empty function by default
});
