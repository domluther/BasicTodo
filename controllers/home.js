// Getting the home page
async function getIndex(req, res) {
  const results = await coll.find().toArray();
  const remainingCount = await coll.countDocuments({ complete: false });
  res.render('index.ejs', { todos: results, count: remainingCount });
}

module.exports = { getIndex };
