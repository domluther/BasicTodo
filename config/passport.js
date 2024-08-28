// Strategy goes here
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../model/User.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { msg: `Username ${username} not found.` });
      }

      const isMatch = await user.comparePassword(password);

      if (isMatch) {
        return done(null, user);
      } 
        return done(null, false, { msg: 'Invalid username or password.' });
      
    } catch (err) {
      console.error('Error in LocalStrategy:', err);
      return done(err);
    }
  }),
);
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize is used to get key information about the user - this one only gets the user id and the rest is fetched from the DB
passport.deserializeUser(async (id, done) => {
  try {
    return done(null, await User.findById(id));
  } catch (error) {
    return done(error);
  }
});

export default passport;
