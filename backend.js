const express = require('express');
const morgan = require('morgan');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 5555;

async function connectToDB() {
  const URI = process.env.MONGO_URI;
  console.log('Connecting to DB');
  const client = new MongoClient(URI);
  try {
    await client.connect();
    coll = client.db('basicTodos').collection('todos');
    console.log('Connected to DB');
    return coll;
  } catch (error) {
    console.error(`Failed to connect to DB - ${error}`);
    process.exit(1);
  }
}

let coll = connectToDB();

app.set('view engine', 'ejs');
// Middleware
app.use(express.static('static'));
// Logging
app.use(morgan('tiny'));
// JSON
app.use(express.json());
// Forms
app.use(express.urlencoded({ extended: true }));

// GET / -> return index.html (move to ejs later)
app.get('/', async (req, res) => {
  const results = await coll.find().toArray();
  const remainingCount = await coll.countDocuments({ complete: false });
  res.render('index.ejs', { todos: results, count: remainingCount });
});

// POST /todo/ -> create a new todo
app.post('/todo/', async (req, res) => {
  console.log(req.body);
  const { task } = req.body;

  // I don't want duplicates
  const results = await coll.find({ task }).toArray();
  console.log(results);
  if (results.length > 0) {
    return res.redirect('/');
  }
  const dbRes = await coll.insertOne({
    task,
    complete: false,
    // 50/50 chance of being priority or not
    priority: Math.random() > 0.5,
  });
  console.log(dbRes);
  res.redirect('/');
});

// GET /todo/ -> return all todo items
app.get('/todo/', async (req, res) => {
  const results = await coll.find().toArray();
  res.json({ results });
});

// GET /todo/random -> return a random item
app.get('/todo/random', async (req, res) => {
  const results = await coll.find().toArray();
  const randomIndex = Math.floor(Math.random() * results.length);
  res.json({ results: results[randomIndex] });
});

// PUT /todo/id -> toggle complete of the todo identified by id
app.put('/todo/complete/:id', async (req, res) => {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await coll.updateOne({ _id: new ObjectId(todoId) }, [
      { $set: { complete: { $not: '$complete' } } },
    ]);
    res.json({ msg: `toggled completion of todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
});

// PUT /todo/id -> toggle complete of the todo identified by id
app.put('/todo/priority/:id', async (req, res) => {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await coll.updateOne({ _id: new ObjectId(todoId) }, [
      { $set: { priority: { $not: '$priority' } } },
    ]);
    res.json({ msg: `toggled priority of todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
});

// DELETE /todo/id -> remove the todo identified by the id
app.delete('/todo/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const dbRes = await coll.deleteOne({ _id: new ObjectId(todoId) });
    console.log(dbRes);
    res.json({ msg: `delete todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
});

// 404 for anything else
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
