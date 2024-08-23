import Todo from '../model/Todo.js';

// Getting the home page
export async function getIndex(req, res) {
  // .collation({locale: "en"}) means the sorting is case insensitive
  const results = await Todo.find().collation({ locale: 'en' }).sort({
    complete: 1,
    priority: -1,
    task: 1,
  });
  const remainingCount = await Todo.countDocuments({ complete: false });
  res.render('index.ejs', { todos: results, count: remainingCount });
}
