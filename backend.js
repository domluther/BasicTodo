// External libraries
import express from 'express';
import morgan from 'morgan';

// my code
import connectToDB from './config/db.js';

//  My routes
import rootRoutes from './routes/index.js';
import todoRoutes from './routes/todo.js';

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

// The routes
app.use('/', rootRoutes);
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
