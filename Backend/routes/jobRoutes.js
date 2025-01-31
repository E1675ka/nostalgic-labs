import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises"; // Use fs.promises for async handling
import { PDFDocument } from "pdf-lib"; // Use pdf-lib for PDF parsing
import Application from "../models/jobApplicationModel.js";
import mongoose from "mongoose";
const router = express.Router();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists before starting the server
const uploadsDir = path.join(__dirname, "../uploads/");
await fs.mkdir(uploadsDir, { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  file.mimetype === "application/pdf"
    ? cb(null, true)
    : cb(new Error("Only PDF files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

// 🚀 **POST: Submit job application & Extract PDF Content**
router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { fname, lname, email, coverLetter } = req.body;
    const resumeFile = req.file;

    if (!resumeFile)
      return res.status(400).json({ message: "Resume file is required." });

    // Get PDF file path
    const filePath = path.join(uploadsDir, resumeFile.filename);

    try {
      // Read the PDF file into a buffer
      const pdfBuffer = await fs.readFile(filePath);

      // Use pdf-lib to extract text from the PDF buffer
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const pages = pdfDoc.getPages();
      let pdfText = "";

      // Loop through all pages and extract text
      for (const page of pages) {
        const textContent = page.getTextContent();
        textContent.forEach((item) => {
          pdfText += item.str + " "; // Append text from each item
        });
      }

      // Construct the full URL for the resume
      const resumeUrl = `http://localhost:5000/api/jobs/uploads/${resumeFile.filename}`;

      // Save application with extracted PDF text
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

// 🚀 **GET: Retrieve and serve PDFs**
router.get("/uploads/:filename", async (req, res) => {
  try {
    const filePath = path.join(uploadsDir, req.params.filename);
    await fs.access(filePath); // Ensure the file exists before sending
    res.sendFile(filePath);
  } catch (error) {
    console.error("File not found:", error);
    res.status(404).json({ message: "File not found" });
  }
});

// 🚀 **GET: View Extracted PDF Text in Database**
router.get("/view-text/:id", async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Log the received ID to verify it
    console.log("Received ID:", applicationId);

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid application ID." });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.json({ extractedText: application.resumeText });
  } catch (error) {
    console.error("Error fetching extracted text:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
