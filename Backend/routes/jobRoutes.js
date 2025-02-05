import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { PDFDocument } from "pdf-lib"; // Correct way to use pdf-lib
import Application from "../models/jobApplicationModel.js";
import mongoose from "mongoose";

const router = express.Router();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists before starting the server
(async () => {
  try {
    await fs.mkdir(path.join(__dirname, "../uploads"), { recursive: true });
  } catch (err) {
    console.error("Error creating uploads directory:", err);
  }
})();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

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

    const filePath = path.join(__dirname, "../uploads", resumeFile.filename);

    try {
      const pdfBuffer = await fs.readFile(filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      let pdfText = "";

      for (const page of pdfDoc.getPages()) {
        const text = await page.getTextContent(); // ❌ This does not exist in pdf-lib
        pdfText += text.items.map((item) => item.str).join(" ") + " ";
      }

      // Construct the resume URL dynamically
      const resumeUrl = `/api/jobs/uploads/${resumeFile.filename}`;

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
    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    await fs.access(filePath);
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
