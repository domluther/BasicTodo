const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');

// POST / -> create a new todo
router.post('/', async (req, res) => {
  const { task } = req.body;

  // I don't want duplicates
  const results = await coll.find({ task }).toArray();
  console.log(results);
  if (results.length > 0) {
    console.log('duplicate');
    return res.redirect('/');
  }
  const dbRes = await coll.insertOne({
    task,
    complete: false,
    // 50/50 chance of being priority or not
    priority: Math.random() > 0.5,
  });
  console.log('Adding it');
  console.log(dbRes);
  res.redirect('/');
});

// GET /todo/ -> return JSON of all the items
router.get('/', async (req, res) => {
  const results = await coll.find().toArray();
  res.json({ results });
});

// GET /todo/random -> return a random item
router.get('/random', async (req, res) => {
  const results = await coll.find().toArray();
  const randomIndex = Math.floor(Math.random() * results.length);
  res.json({ results: results[randomIndex] });
});

// PUT /todo/id -> toggle complete of the todo identified by id
router.put('/complete/:id', async (req, res) => {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await coll.updateOne({ _id: new ObjectId(todoId) }, [
      { $set: { complete: { $not: '$complete' } } },
    ]);
    console.log('Completed');
    res.json({ msg: `toggled completion of todo ${todoId}` });
  } catch (error) {
    console.log(error);
    res.json({ error: 'invalid id' });
  }
});

// PUT /todo/id -> toggle complete of the todo identified by id
router.put('/priority/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const dbRes = await coll.deleteOne({ _id: new ObjectId(todoId) });
    console.log(dbRes);
    res.json({ msg: `delete todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
});

module.exports = router;
