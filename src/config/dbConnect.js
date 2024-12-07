import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default dbConnect;
