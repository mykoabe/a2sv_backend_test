import mongoose from "mongoose";

const databaseURL = "mongodb://127.0.0.1:27017/example";

const connectDatabase = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log("Connected to database");
  } catch (error) {
    console.error(`Database connection error: ${error}`);
  }
};

export default connectDatabase;
