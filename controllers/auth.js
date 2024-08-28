import passport from 'passport';
import User from '../model/User.js';

export function login(req, res, next) {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      return res.redirect('/');
    }
    console.log('About to login');
    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
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

export async function signup(req, res, next) {
  // const validationErrors = [];
  // if (!validator.isEmail(req.body.email))
  //   validationErrors.push({ msg: 'Please enter a valid email address.' });
  // if (!validator.isLength(req.body.password, { min: 8 }))
  //   validationErrors.push({
  //     msg: 'Password must be at least 8 characters long',
  //   });
  // if (req.body.password !== req.body.confirmPassword)
  //   validationErrors.push({ msg: 'Passwords do not match' });
  // if (validationErrors.length) {
  //   return res.redirect('../signup');
  // }

  try {
    const { username } = req.body;
    console.log(`Trying to sign up ${username}`);
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log(`${username} already exists`);
      return res.redirect('/');
    }

    const user = new User({
      username,
      password: req.body.password,
    });

    await user.save();

    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.redirect('/todo');
    });
    return null;
  } catch (signupError) {
    return next(signupError);
  }
}
