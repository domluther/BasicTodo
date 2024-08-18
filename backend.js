const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

//  I need my routes
const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5555;

async function connectToDB() {
  const URI = process.env.MONGO_URI;
  console.log('Connecting to DB');
  const client = new MongoClient(URI);
  try {
    await client.connect();
    // This coll variable is used throughout - terrible practice - needs updating and moving to model
    coll = client.db('basicTodos').collection('todos');
    console.log('Connected to DB');
  } catch (error) {
    console.error(`Failed to connect to DB - ${error}`);
    process.exit(1);
  }
}

connectToDB();

app.set('view engine', 'ejs');
// Middleware
app.use(express.static('static'));
// Logging
app.use(morgan('tiny'));
// JSON
app.use(express.json());
// Forms
app.use(express.urlencoded({ extended: true }));

// The routes
app.use('/', homeRoutes);
app.use('/todo', todoRoutes);

// 404 for anything else
const unknownEndpoint = (req, res) => {
  res.status(404).render('404.ejs');
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
