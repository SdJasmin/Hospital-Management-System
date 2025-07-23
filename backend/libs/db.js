import mongoose from "mongoose";

const dbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb is connected ...");
  } catch (error) {
    console.log("mongodb connection error", error);
  }
};

export default dbCon;
