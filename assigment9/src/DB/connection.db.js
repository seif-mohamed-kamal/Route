import mongoose from "mongoose"
import { DB_URI } from "../../config/config.service.js"

export const connecttoDB = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log("CONNECTED TO DB SUCCESSFULLY")
  } catch (error) {
  console.log(`ERROR TO CONNECT TO DB ${error}`)
  }
};
