const { MongoClient } = require('mongodb');

async function connectToDB() {
  const URI = process.env.MONGO_URI;
  const dbName = 'basicTodos';
  const collName = 'todos';
  console.log(`Connecting to ${dbName} `);
  const client = new MongoClient(URI);
  try {
    await client.connect();
    // This coll variable is used throughout - terrible practice - needs updating and moving to model
    coll = client.db(dbName).collection(collName);
    console.log(`Connected to ${dbName}`);
  } catch (error) {
    console.error(`Failed to connect to DB ${dbName} - ${error}`);
    process.exit(1);
  }
}

module.exports = { connectToDB };
