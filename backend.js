// External libraries
const express = require('express');
const morgan = require('morgan');

// my code
const { connectToDB } = require('./config/db');

//  My routes
const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todos');

// Constants
const app = express();
const PORT = process.env.PORT || 5555;

connectToDB();

app.set('view engine', 'ejs');
// Middleware - Static, logging, json + forms
app.use(express.static('static'));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The routes
app.use('/', homeRoutes);
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
