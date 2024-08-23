import mongoose from 'mongoose';

const collName = 'todos';

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
  },

  complete: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.model(collName, todoSchema);

export default Todo;
