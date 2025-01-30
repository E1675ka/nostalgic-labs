import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { CareerInfo } from "../constants/index"; // Ensure this is the correct path to your data
import { SectionWrapper } from "../hoc";
import JobApplicationForm from "./jobAppForm";
import ViewApplications from "./AppliedInfo";
const JobDetailsPage = () => {
  const { JobId } = useParams(); // Get the JobId from the URL
  // console.log("JobId from URL:", JobId);
  // console.log("CareerInfo data:", CareerInfo);


  const job = CareerInfo.find((job) => String(job.JobId) === String(JobId));

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-red-500 text-xl font-bold">Job not found!</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 py-14 my-5 h-100%">
      <h1 className="text-4xl font-bold mb-6 text-purple-600">{job.Business}</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-purple-500">Location:</h2>
          <p className="text-gray-700">{job.Locations}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-purple-500">
            Job Description:
          </h2>
          <p className="text-gray-700">{job.JobDescription}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-purple-500">Summary:</h2>
          <p className="text-gray-700">{job.JobSummary}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-purple-500">
            Responsibilities:
          </h2>
          <p className="text-gray-700">{job.Responsibilities}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-purple-500">
            Qualifications:
          </h2>
          <p className="text-gray-700">{job.Qualifications}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-purple-500">
            Compensation:
          </h2>
          <p className="text-gray-700">{job.Compensation}</p>
        </section>
      </div>
      <JobApplicationForm />

      <ViewApplications />
    </div>
  );
};
export default SectionWrapper(JobDetailsPage, "JobDetailsPage");
