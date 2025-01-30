import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Loads .env file into process.env
// Get Mongo URI from environment variables
// const mongoURI = process.env.MONGO_URI;
// console.log(mongoURI)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
