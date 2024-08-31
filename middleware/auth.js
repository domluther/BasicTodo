export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('Authed so continuing');
    return next();
  }
  console.log('Not authed so going home');
  return res.redirect('/');
}

export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log('Not auth so continuing');
    return next();
  }
  console.log('Auth so going to todo');
  return res.redirect('/todo');
}
