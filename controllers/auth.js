import passport from 'passport';
import User from '../model/User.js';

// Simplified login function - instead of the callback option
export function login(req, res, next) {
  passport.authenticate('local', {
    successFlash: 'You have logged in',
    successMessage: 'You have logged in',
    successRedirect: '/todo',
    failureFlash: 'Login failed',
    failureMessage: 'Login failed',
    failureRedirect: '/',
  })(req, res, next);
}

export function logout(req, res, next) {
  req.logout((err) => {
    console.log('Logging user out');
    // Remove the cookie from the browser
    res.clearCookie('connect.sid');
    if (err) {
      console.error('Error : Failed to logout');
      return next(err);
    }
    return res.redirect('/');
  });
}

export async function signup(req, res, next) {
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

    // Simplified - use the same login function from above instead of writing my own
    login(req, res, next);
  } catch (signupError) {
    return next(signupError);
  }
}
