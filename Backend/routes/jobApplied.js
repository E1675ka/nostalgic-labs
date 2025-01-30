// routes/jobApplicationRoutes.js
import express from "express";
import Application from "../models/jobApplicationModel.js";

const router = express.Router();

// GET route to view all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find(); // Get all applications
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// GET route to view a specific application by ID
router.get("/applications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    res.status(200).json({ application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

export default router;
