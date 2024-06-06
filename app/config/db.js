import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }

  const connection = mongoose.connection;
  connection.on("error", (err) => {
    console.error("Connection error:", err);
  });
};

export default connectDB;
