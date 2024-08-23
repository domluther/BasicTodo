import { Types } from 'mongoose';
import Todo from '../model/Todo.js';

// Return all the todos as JSON
export async function returnTodos(req, res) {
  const results = await Todo.find();
  res.json({ results });
}

export async function createTodo(req, res) {
  // What's the task
  const { task } = req.body;

  // Ensure there are no duplicates
  const results = await Todo.find({ task });
  console.log(results);
  if (results.length > 0) {
    console.log('duplicate');
    return res.redirect('/');
  }
  //   Send the request to the model
  const dbRes = await Todo.create({
    task,
    complete: false,
    priority: false,
  });
  console.log('Adding it');
  console.log(dbRes);
  res.redirect('/');
}

export async function returnRandomTodo(req, res) {
  // Get all the tasks
  const results = await Todo.find({ complete: false });
  // Random picker takes into account priority.
  let randomIndex = Math.floor(Math.random() * results.length);
  let result = results[randomIndex];
  if (result.priority) {
    return res.json({ result });
  }
  //  If the first pick isn't priority, again.
  console.log('Re-rolling');
  randomIndex = Math.floor(Math.random() * results.length);
  result = results[randomIndex];
  return res.json({ result });
}

export async function toggleComplete(req, res) {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await Todo.updateOne({ _id: Types.ObjectId.createFromHexString(todoId) }, [
      { $set: { complete: { $not: '$complete' } } },
    ]);
    console.log('Completed');
    res.json({ msg: `toggled completion of todo ${todoId}` });
  } catch (error) {
    console.log(error);
    res.json({ error: 'invalid id' });
  }
}

export async function togglePriority(req, res) {
  const todoId = req.params.id;
  console.log(todoId);

  // Toggle field
  //   Uses [] as it is an aggregation pipeline - needed to use $not
  try {
    await Todo.updateOne({ _id: Types.ObjectId.createFromHexString(todoId) }, [
      { $set: { priority: { $not: '$priority' } } },
    ]);
    res.json({ msg: `toggled priority of todo ${todoId}` });
  } catch (error) {
    res.json({ error: 'invalid id' });
  }
}

export async function deleteTodo(req, res) {
  const todoId = req.params.id;
  console.log(`Trying to delete ${todoId}`);
  try {
    const dbRes = await Todo.deleteOne({
      _id: Types.ObjectId.createFromHexString(todoId),
    });
    console.log(dbRes);
    if (dbRes.deletedCount === 1) {
      return res.json({ msg: `delete todo ${todoId}` });
    } else {
      throw new Error(`No document deleted for ID ${todoId}`);
    }
  } catch (error) {
    res.json({ error: error });
  }
}
