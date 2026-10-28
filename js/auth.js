/* Prototype-only login. These credentials are PUBLIC and are not security.
   Do not reuse for patient data, production, or any confidential content. */
(() => {
  'use strict';
  const KEY = 'silrs-demo-auth';
  const isLogin = /(?:^|\/)login\.html$/i.test(location.pathname);
  const isSplash = /(?:^|\/)index\.html$/i.test(location.pathname) || /\/$/.test(location.pathname);
  const authenticated = () => sessionStorage.getItem(KEY) === 'active';
  const login = (user, pass) => {
    if (user.trim() === 'demo' && pass === 'SILRS2026!') {
      sessionStorage.setItem(KEY, 'active');
      return true;
    }
    return false;
  };
  const logout = () => {
    sessionStorage.removeItem(KEY);
    location.replace('login.html');
  };
  window.SILRSAuth = Object.freeze({ authenticated, login, logout });
  if (!isLogin && !isSplash && !authenticated()) location.replace('login.html');
  if (isLogin && authenticated()) location.replace('dashboard.html');
})();
