// Extract Authentication method from state
export const getAuth = state => state.auth;

// Checks if user is Authenticated
export const isAuthenticated = state => getAuth(state).authenticated;
