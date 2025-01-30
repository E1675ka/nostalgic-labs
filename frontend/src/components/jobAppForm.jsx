import React, { useState } from "react";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Only storing the first file if multiple files are selected
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className=" flex flex-col   items-center container  p-4">
      <h2 className="text-4xl font-bold text-purple-950  mb-4">Application</h2>
      <form className="space-y-4  p-4 rounded-lg   xl:w-[850px] lg:w-[800px]  md:w-[750px] sm:w-[500px] ">
        {/* Personal Information */}
        <fieldset className="border p-4 rounded">
          <legend className="text-xl text-purple-950 shadow-lg p-2 font-medium">
            Personal Information
          </legend>

          <div className=" sm:flex-col md:flex-col lg:flex-row xl:flex-row flex space-x-2">
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
                className="block text-purple-950  font-medium"
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
              className="w-[350px] text-black shadow-lg bg-white p-3 border  border-gray-300 rounded"
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
          <legend className="text-xl font-medium text-purple-950  p-2 ">
            Upload Your Resume
          </legend>

          <div>
            <label
              htmlFor="resume"
              className="block text-purple-950  font-medium"
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
        <div classname="flex flex-row justify-center items-center">
          <button
            type="submit"
            className="w-60 py-3 px-4 bg-purple-600 text-white font-semibold rounded-md"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
