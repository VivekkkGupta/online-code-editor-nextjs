import mongoose from "mongoose";
import { MONGO_DB_URI } from "../constants/constants";

const MONGODB_URI = MONGO_DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please MONGO_DB_URI environment variable.");
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
