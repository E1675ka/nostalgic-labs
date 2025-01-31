import React, { useEffect, useState } from "react";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/applications`
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

    fetchApplications(); // Fetch applications on component mount
  }, []);

  return (
    <div>
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
                  href={`${import.meta.env.VITE_API_BASE_URL}/${application.resumePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
