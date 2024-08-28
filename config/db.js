import mongoose from 'mongoose';

async function connectToDB() {
  console.log(`Connecting to database `);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Failed to connect to DB - ${error}`);
    process.exit(1);
  }
}

export default connectToDB;
