export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('authenticationFailed');
  window.location.href = '/';
}
