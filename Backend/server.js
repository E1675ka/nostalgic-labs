import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"; // Import job application route
import connectDB from "./config/config.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(
  cors({
    origin:["http://localhost:5173","https://nostalgic-labs-kywv.vercel.app"], // Replace with your frontend's URL if different
    methods: "GET,POST, PUT, DELETE",
    
    credentials: true,
  })  
);

console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes); // Add job application route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
