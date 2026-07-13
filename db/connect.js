const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  database = client.db("contactsDB");

  console.log("Connected to MongoDB");

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};