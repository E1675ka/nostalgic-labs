import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import Application from "../models/jobApplicationModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Use project root instead of __dirname
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Ensure uploads directory exists before starting the server
(async () => {
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch (err) {
    console.error("Error creating uploads directory:", err);
  }
})();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR), // ✅ Fixed absolute path
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  file.mimetype === "application/pdf"
    ? cb(null, true)
    : cb(new Error("Only PDF files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

const apiUrl = process.env.API_URL;

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { fname, lname, email, coverLetter } = req.body;
    const resumeFile = req.file;

    if (!resumeFile)
      return res.status(400).json({ message: "Resume file is required." });

    const filePath = path.join(UPLOADS_DIR, resumeFile.filename); // ✅ Fixed path
    console.log("File saved at:", filePath); // Debugging output

    try {
      const pdfBuffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(pdfBuffer);
      const pdfText = pdfData.text;

      const resumeUrl = `${apiUrl}/api/jobs/uploads/${resumeFile.filename}`;

      const newApplication = new Application({
        fname,
        lname,
        email,
        coverLetter,
        resumePath: resumeFile.filename,
        resumeText: pdfText,
      });

      await newApplication.save();

      res.status(200).json({
        message: "Application submitted successfully!",
        resumeUrl,
        extractedText: pdfText,
      });
    } catch (pdfError) {
      console.error("Error processing PDF:", pdfError);
      return res.status(500).json({ message: "Error reading PDF file." });
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

router.get("/uploads/:filename", async (req, res) => {
  try {
    const filePath = path.join(UPLOADS_DIR, req.params.filename); // ✅ Fixed path
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.error("File not found:", error);
    res.status(404).json({ message: "File not found" });
  }
});

export default router;
