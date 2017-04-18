// Extract Authentication method from state
export function getAuth(state) {
  return state.auth;
}

// Checks if user is Authenticated
export function isAuthenticated(state) {
  return getAuth(state).authenticated;
}
