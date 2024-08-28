// External libraries
import express from 'express';
import morgan from 'morgan';
// Used for auth
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';

// my code
import connectToDB from './config/db.js';
// Not called but simply importing it means that it is run
import * as passportConfig from './config/passport.js';

//  My routes
import rootRoutes from './routes/index.js';
import todoRoutes from './routes/todo.js';
import authRoutes from './routes/auth.js';

// Constants
const app = express();
const PORT = process.env.PORT || 5555;

connectToDB();

app.set('view engine', 'ejs');
// Middleware - Static, logging, json + forms
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session must come before Passport middleware
app.use(
  session({
    secret: 'keyboard cat',
    // Hackathon has these as true and an option of secret and cookie
    resave: true,
    saveUninitialized: true,
    // New way of doing MongoStore
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  }),
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Used to show messages
app.use(flash());

// The routes
app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

// 404 for anything else
const unknownEndpoint = (req, res) => {
  res.status(404).render('404.ejs');
};

// After the valid routes
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
