import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// Before saving a document, hash the password for security
userSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    user.password = await bcrypt.hash(user.password, 10);
    console.log('Hashed password');
    next();
  } catch (err) {
    next(err);
  }
});

// Hashes the entered password and compares it with the hashed value in the database
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
