import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGO_URI;

    // // Conectar a la base de datos
    // await mongoose.connect('mongodb://localhost:27017/pawsome', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("🎯Connected to MongoDB");
  } catch (err) {
    console.error("❗Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;