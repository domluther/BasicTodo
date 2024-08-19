const { ObjectId } = require('mongodb');

// Return all the todos as JSON
async function returnTodos(req, res) {
  const results = await coll.find().toArray();
  res.json({ results });
}

async function createTodo(req, res) {
  // What's the task
  const { task } = req.body;

  // Ensure there are no duplicates
  const results = await coll.find({ task }).toArray();
  console.log(results);
  if (results.length > 0) {
    console.log('duplicate');
    return res.redirect('/');
  }
  //   Send the request to the model
  const dbRes = await coll.insertOne({
    task,
    complete: false,
    // 50/50 chance of being priority or not
    priority: Math.random() > 0.5,
  });
  console.log('Adding it');
  console.log(dbRes);
  res.redirect('/');
}

async function returnRandomTodo(req, res) {
  // Fixed - added complete : fase as otherwise could suggest a random task that had been finished.
  const results = await coll.find({ complete: false }).toArray();
  const randomIndex = Math.floor(Math.random() * results.length);
  res.json({ results: results[randomIndex] });
}

async function toggleComplete(req, res) {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await coll.updateOne({ _id: ObjectId.createFromHexString(todoId) }, [
      { $set: { complete: { $not: '$complete' } } },
    ]);
    console.log('Completed');
    res.json({ msg: `toggled completion of todo ${todoId}` });
  } catch (error) {
    console.log(error);
    res.json({ error: 'invalid id' });
  }
}

async function togglePriority(req, res) {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await coll.updateOne({ _id: ObjectId.createFromHexString(todoId) }, [
      { $set: { priority: { $not: '$priority' } } },
    ]);
    res.json({ msg: `toggled priority of todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
}

async function deleteTodo(req, res) {
  const todoId = req.params.id;
  try {
    const dbRes = await coll.deleteOne({ _id: new ObjectId(todoId) });
    console.log(dbRes);
    res.json({ msg: `delete todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
}

module.exports = {
  createTodo,
  deleteTodo,
  returnRandomTodo,
  returnTodos,
  toggleComplete,
  togglePriority,
};
