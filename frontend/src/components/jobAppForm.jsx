import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    coverLetter: "",
    resume: null,
  });
  const [fileName, setFileName] = useState("");
  const [submittedData, setSubmittedData] = useState(null); // To store submitted data
  const [pdfUrl, setPdfUrl] = useState(""); // To store the PDF URL

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setFileName(files[0]?.name || ""); // Update displayed filename
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation before submitting
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
    formDataToSend.append("fname", formData.fname);
    formDataToSend.append("lname", formData.lname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("coverLetter", formData.coverLetter);
    formDataToSend.append("resume", formData.resume); // Append file

    try {
      const response = await fetch(`${apiUrl}/api/jobs/apply`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      alert(result.message);

      // Store submitted data in state after successful submission
      setSubmittedData({
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        coverLetter: formData.coverLetter,
        resume: fileName, // Show the uploaded file's name
      });

      // Store the URL of the uploaded resume to display as a PDF
      setPdfUrl(URL.createObjectURL(formData.resume));

      // Optionally, clear the form data after submission
      setFormData({
        fname: "",
        lname: "",
        email: "",
        coverLetter: "",
        resume: null,
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center container p-4">
      <h2 className="text-4xl font-bold text-purple-950 mb-4">Application</h2>

      {/* Form starts here */}
      <form
        className="space-y-4 p-4 rounded-lg xl:w-[850px] lg:w-[800px] md:w-[750px] sm:w-[500px]"
        onSubmit={handleSubmit}
      >
        {/* Personal Information */}
        <fieldset className="border p-4 rounded">
          <legend className="text-xl text-purple-950 shadow-lg p-2 font-medium">
            Personal Information
          </legend>

          <div className="sm:flex-col md:flex-col lg:flex-row xl:flex-row flex space-x-2">
            <div className="flex flex-col">
              <label
                htmlFor="fname"
                className="block text-purple-950 font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                value={formData.fname}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className="w-[350px] p-3 border text-black shadow-lg bg-white border-gray-300 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="lname"
                className="block text-purple-950 font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                value={formData.lname}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className="w-[350px] p-3 border text-black shadow-lg bg-white border-gray-300 rounded"
              />
            </div>
          </div>
        </fieldset>

        {/* Email Section */}
        <fieldset className="border p-4 rounded">
          <legend className="text-xl font-medium text-purple-950 p-2">
            Contact Information
          </legend>

          <div>
            <label
              htmlFor="email"
              className="block font-medium text-purple-900"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-[350px] text-black shadow-lg bg-white p-3 border border-gray-300 rounded"
            />
          </div>
        </fieldset>

        {/* Cover Letter Section */}
        <fieldset className="border p-4 rounded">
          <legend className="text-xl text-purple-950 p-2 font-medium">
            Cover Letter
          </legend>

          <div>
            <textarea
              name="coverLetter"
              id="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              required
              placeholder="Write a cover letter"
              rows="5"
              className="w-full p-3 border shadow-lg border-gray-300 text-black bg-transparent rounded"
            />
          </div>
        </fieldset>

        {/* Resume Section */}
        <fieldset className="border p-4 rounded">
          {fileName && (
            <p className="text-gray-600 mt-1">Selected: {fileName}</p>
          )}

          <legend className="text-xl font-medium text-purple-950 p-2">
            Upload Your Resume
          </legend>

          <div>
            <label
              htmlFor="resume"
              className="block text-purple-950 font-medium"
            >
              Resume (PDF only)
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              onChange={handleChange}
              required
              className="w-full p-3 border shadow-lg border-gray-300 rounded"
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="flex flex-row justify-center items-center">
          <button
            type="submit"
            className="w-60 py-3 px-4 bg-purple-600 text-white font-semibold rounded-md"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-100">
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

      {/* Display the PDF resume */}
      {pdfUrl && (
        <div
          className="mt-8 h-[500px] w-[500px] p-4 border rounded-lg bg-gray-100 "
         
        >
          <h3 className="text-2xl font-semibold">Resume PDF</h3>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
