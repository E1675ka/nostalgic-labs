import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import apiUrl from "../api/api";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    coverLetter: "",
    resume: null,
  });
  const [fileName, setFileName] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      setFileName(files[0].name);
    } else if (type !== "file") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fname ||
      !formData.lname ||
      !formData.email ||
      !formData.coverLetter ||
      !formData.resume
    ) {
      alert("Please fill in all fields and upload a resume.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(`${apiUrl}/api/jobs/applications`, {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      alert(result.message);

      setSubmittedData({ ...formData, resume: fileName });
      setPdfUrl(URL.createObjectURL(formData.resume));
      setFormData({
        fname: "",
        lname: "",
        email: "",
        coverLetter: "",
        resume: null,
      });
      setFileName("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center container p-4">
      <h2 className="text-4xl font-bold text-purple-950 mb-4">Application</h2>
      <form
        className="space-y-4 p-4 rounded-lg max-w-xl w-full"
        onSubmit={handleSubmit}
      >
        <fieldset className="border p-4 rounded">
          <legend className="text-xl text-purple-950 font-medium">
            Personal Information
          </legend>
          <div className="flex flex-col gap-3">
            <label htmlFor="fname" className="text-purple-950 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={formData.fname}
              onChange={handleChange}
              required
              className="p-3 border text-black bg-white rounded"
            />
            <label htmlFor="lname" className="text-purple-950 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
              required
              className="p-3 border text-black bg-white rounded"
            />
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded">
          <legend className="text-xl font-medium text-purple-950">
            Contact Information
          </legend>
          <label htmlFor="email" className="text-purple-900 font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border text-black bg-white rounded w-full"
          />
        </fieldset>

        <fieldset className="border p-4 rounded">
          <legend className="text-xl text-purple-950 font-medium">
            Cover Letter
          </legend>
          <textarea
            name="coverLetter"
            id="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
            rows="5"
            className="p-3 border text-black bg-white rounded w-full"
          ></textarea>
        </fieldset>

        <fieldset className="border p-4 rounded">
          <legend className="text-xl font-medium text-purple-950">
            Upload Your Resume
          </legend>
          {fileName && (
            <p className="text-gray-600 mt-1">Selected: {fileName}</p>
          )}
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf"
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          />
        </fieldset>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md"
        >
          Submit Application
        </button>
      </form>

      {submittedData && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-100 w-full max-w-xl">
          <h3 className="text-2xl font-semibold">Submitted Information</h3>
          <p>
            <strong>First Name:</strong> {submittedData.fname}
          </p>
          <p>
            <strong>Last Name:</strong> {submittedData.lname}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Cover Letter:</strong> {submittedData.coverLetter}
          </p>
          <p>
            <strong>Resume:</strong> {submittedData.resume}
          </p>
        </div>
      )}

      {pdfUrl && (
        <div className="mt-8 h-96 w-full max-w-xl p-4 border rounded-lg bg-gray-100">
          <h3 className="text-2xl font-semibold">Resume PDF</h3>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
