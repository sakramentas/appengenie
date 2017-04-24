// Extract Authentication method from state
export const getAuth = state => {
  return state.auth;
};

// Checks if user is Authenticated
export const isAuthenticated = state => {
  return getAuth(state).authenticated;
};
