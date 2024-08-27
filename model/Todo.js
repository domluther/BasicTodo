import mongoose from 'mongoose';

const collName = 'todos';

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },

  complete: {
    type: Boolean,
    default: false,
    required: true,
  },
  priority: {
    type: Boolean,
    default: false,
    required: true,
  },
  userId: {
    type: String,
  },
});

const Todo = mongoose.model(collName, todoSchema);

export default Todo;
