import Todo from '../model/Todo.js';

// Getting the home page
export async function getIndex(req, res) {
  const results = await Todo.find();
  const remainingCount = await Todo.countDocuments({ complete: false });
  res.render('index.ejs', { todos: results, count: remainingCount });
}
