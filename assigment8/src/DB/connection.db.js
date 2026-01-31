import { DB_NAME, DB_URI } from "../../config/config.service.js";

import { MongoClient } from "mongodb";

const client = new MongoClient(DB_URI , {serverSelectionTimeoutMS:5000});

export const db = client.db(DB_NAME)

export const authMongo = async () => {
  try {
    await client.connect();
    console.log("Conncered to Mongo");
  } catch (error) {
    console.log(`error occurrs ${error}`);
  }
};
