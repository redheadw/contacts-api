const { MongoClient } = require("mongodb");

let database;

async function connectDB() {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  database = client.db("contactsDB");
  console.log("Connected to MongoDB");
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected");
  }
  return database;
}

module.exports = { connectDB, getDb };