import Todo from '../model/Todo.js';

export async function getIndex(req, res) {
  res.render('index.ejs');
}
