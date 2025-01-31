import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"; 
import connectDB from "./config/config.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
app.use(
  cors({ origin: "*", methods: "GET,POST,PUT,DELETE", credentials: true })
);

// Middleware
app.use(express.json()); 
const allowedOrigins = [
  "https://nostalgic-labs-kywv.vercel.app",
  "https://nostalgic-labs-kywv-71v4voalk-e1675kas-projects.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`Request Origin: ${req.headers.origin}`);
  next();
});

console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
