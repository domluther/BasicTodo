import { Types } from 'mongoose';
import Todo from '../model/Todo.js';

// Getting the todo page
export async function getTodo(req, res) {
  try {
    console.log(req.session);
    // Needed to work out who the user is & render the page with their name
    const { username, _id } = req.user;
    // .collation({locale: "en"}) means the sorting is case insensitive
    const results = await Todo.find({ userId: _id })
      .collation({ locale: 'en' })
      .sort({
        complete: 1,
        priority: -1,
        task: 1,
      });
    const remainingCount = await Todo.countDocuments({
      userId: _id,
      complete: false,
    });
    res.render('todo.ejs', { todos: results, count: remainingCount, username });
  } catch (error) {
    console.log(error);
    res.status(400).redirect('/');
  }
}

export async function createTodo(req, res) {
  // What's the task
  const { task, priority } = req.body;
  // Who made it
  const { _id } = req.user;
  //   Create a new todo using the Model
  const doc = new Todo({
    userId: _id,
    task,
    complete: false,
    priority: priority,
  });
  try {
    const dbRes = await doc.save();
    console.log(`Task added: ${task}`);
    res.redirect('/todo');
  } catch (error) {
    // Generally to catch attempts to duplicate
    console.error(error.message);
    res.status(400).redirect('/todo');
  }
}

export async function updateTodo(req, res) {
  // Which user - can only update your own tasks
  const { _id } = req.user;
  // What's the task
  const todoId = Types.ObjectId.createFromHexString(req.params.id);
  const { task } = req.body;
  try {
    const dbRes = await Todo.findOneAndUpdate(
      { _id: todoId, userId: _id },
      { $set: { task } },
      // Without this, doesn't run validator (check min length)
      { runValidators: true },
    );
    console.log(dbRes);
    console.log(`Updated text to ${task}`);
    res.redirect(200, '/todo');
  } catch (error) {
    console.error(error);
    res.redirect(400, '/todo');
  }
}

export async function returnRandomTodo(req, res) {
  // Which user?
  const { _id } = req.user;
  // Get incomplete tasks for the specific user
  const results = await Todo.find({ userId: _id, complete: false });

  // Randomly roll but if it's not a  priority task then try again
  let randomIndex = Math.floor(Math.random() * results.length);
  let result = results[randomIndex];
  if (result.priority) {
    return res.json({ result });
  }
  //  If the first pick isn't priority, again.
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
    }
    throw new Error(`No document deleted for ID ${todoId}`);
  } catch (error) {
    res.json({ error });
  }
}
