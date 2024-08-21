import mongoose from 'mongoose';

const collName = 'todos';

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },

  complete: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: Boolean,
  },
});

const Todo = mongoose.model(collName, todoSchema);

export default Todo;
