const express = require('express');
const router = express.Router();

// GET / -> return index.html
router.get('/', async (req, res) => {
  const results = await coll.find().toArray();
  const remainingCount = await coll.countDocuments({ complete: false });
  res.render('index.ejs', { todos: results, count: remainingCount });
});

// Export the router
module.exports = router;
