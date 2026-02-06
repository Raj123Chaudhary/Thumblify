import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on("connected",()=>console.log("Database connected"));
   await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (error) {
    console.log("data is not connected ", error);
    process.exit(1);
  }
};

// module.exports = connectDB;
export default connectDB;


