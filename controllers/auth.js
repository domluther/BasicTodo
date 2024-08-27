import User from '../model/User.js';
import passport from 'passport';

export function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/todo');
    });
  })(req, res, next);
}

export function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      console.log(`error logging out - ${err.message}`);
      return next(err);
    }
  });
  req.flash('success', { msg: 'Success! You have logged out.' });
  res.redirect('/');
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
