import Todo from '../model/Todo.js';

export async function getIndex(req, res) {
  res.render('index.ejs');
}
// Getting the todo page
export async function getTodo(req, res) {
  try {
    console.log(req.user);
    const { username, _id } = req.user;
    console.log(username, _id);
    // .collation({locale: "en"}) means the sorting is case insensitive
    const results = await Todo.find().collation({ locale: 'en' }).sort({
      complete: 1,
      priority: -1,
      task: 1,
    });
    const remainingCount = await Todo.countDocuments({ complete: false });
    res.render('todo.ejs', { todos: results, count: remainingCount, username });
  } catch (error) {
    res.status(400).redirect('/');
  }
}
