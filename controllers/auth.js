import passport from 'passport';
import User from '../model/User.js';

export function login(req, res, next) {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/');
    }
    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      return res.redirect(req.session.returnTo || '/todo');
    });
    return null; // To stop eslint
  })(req, res, next);
}

export function logout(req, res) {
  console.log('Session before logout:', req.session);
  req.logout(() => {
    console.log('User has logged out.');
    req.session.destroy((err) => {
      if (err)
        console.log(
          'Error : Failed to destroy the session during logout.',
          err,
        );
      req.user = null;
      res.redirect('/');
    });
  });
}

// Currently just creates a user called bob with a password of bob - was for test purposes.
// Change to read the body off the post request and then create the user like that and redirect + flash?
export async function signup(req, res, next) {
  try {
    await User.create({ username: 'bob', password: 'bob' });
    req.flash('success', { msg: 'Account created - now login' });
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.status(400).redirect('/');
  }
}
