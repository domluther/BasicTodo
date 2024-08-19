const { Todo } = require('../model/Todo');

// Getting the home page
async function getIndex(req, res) {
  const results = await Todo.find();
  const remainingCount = await Todo.countDocuments({ complete: false });
  res.render('index.ejs', { todos: results, count: remainingCount });
}

module.exports = { getIndex };
