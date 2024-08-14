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

// Middleware
app.use(express.static('static'));
// Logging
app.use(morgan('tiny'));
// JSON
app.use(express.json());
// Forms
app.use(express.urlencoded({ extended: true }));

// GET / -> return index.html (move to ejs later)
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// POST /todo/ -> create a new todo
app.post('/todo/', async (req, res) => {
  console.log(req.body);
  const { task } = req.body;
  const dbRes = await coll.insertOne({
    task,
    complete: false,
    priority: Math.random() > 0.5,
  });
  console.log(dbRes);
  res.json({ msg: 'new todo' });
});

// GET /todo/ -> return all todo items
app.get('/todo/', async (req, res) => {
  const results = await coll.find().toArray();
  console.log(results);
  res.json({ msg: 'get todos' });
});

// PUT /todo/id -> toggle complete of the todo identified by id
app.put('/todo/:id', async (req, res) => {
  const todoId = req.params.id;
  const dbRes = await coll.updateOne(
    { _id: new ObjectId(todoId) }[
      {
        $set: { complete: { $eq: [false, '$complete'] } },
      }
    ]
  );
  console.log(dbRes);
  res.json({ msg: `toggled complete of todo ${todoId}` });
});

// DELETE /todo/id -> remove the todo identified by the id
app.delete('/todo/:id', async (req, res) => {
  const todoId = req.params.id;
  const dbRes = await coll.deleteOne({ _id: new ObjectId(todoId) });
  console.log(dbRes);
  res.json({ msg: `delete todo ${todoId}` });
});

// 404 for anything else
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
