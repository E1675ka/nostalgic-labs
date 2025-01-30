import React, { useEffect, useState } from "react";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track form submission

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs/applications"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError(
          "There was an error fetching the applications. Please try again."
        );
      }
    };

    if (submitted) {
      fetchApplications(); // Fetch only if the form is submitted
    }
  }, [submitted]); // Re-fetch data when `submitted` changes to true

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Set form submitted to true
  };

  return (
    <div>
      {/* Simulate a form submission */}
      <form onSubmit={handleFormSubmit}>
        <button type="submit" className="btn btn-primary">
          Submit Form
        </button>
      </form>

      {submitted && ( // Only show applications if form is submitted
        <>
          <h2 className="text-2xl font-bold">Job Applications</h2>
          {error && <p className="text-red-500">{error}</p>}
          {applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <div>
              {applications.map((application) => (
                <div key={application._id} className="border p-4 mb-2">
                  <h3 className="text-xl">
                    {application.fname} {application.lname}
                  </h3>
                  <p>Email: {application.email}</p>
                  <p>Cover Letter: {application.coverLetter}</p>
                  <p>
                    Resume:{" "}
                    <a
                      href={`http://localhost:5000/${application.resumePath}`} // Make sure the resume is being served properly
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewApplications;
