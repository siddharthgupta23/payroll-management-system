import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose"


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")
    return conn
  } catch (error) {
    console.error("Database connection failed:", error)
    process.exit(1)
  }
}

export default connectDB
