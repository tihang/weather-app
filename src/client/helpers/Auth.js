const isLoggedIn = () => {
  if (localStorage.getItem('auth-token')) return true;
  return false;
};

const logout = () => {
  localStorage.removeItem('auth-token');
  window.location.reload(false);
};

export { isLoggedIn, logout };
