const mongoose = require('mongoose');

async function connectToDB() {
  const URI = process.env.MONGO_URI;
  console.log(`Connecting to database `);
  try {
    const conn = await mongoose.connect(URI);
    console.log(`Connected to ${conn.connection.name}`);
  } catch (error) {
    console.error(`Failed to connect to DB - ${error}`);
    process.exit(1);
  }
}

module.exports = { connectToDB };
