import React from 'react';

const Services = () => {
  // State and functions can go here

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Welcome to The Services page</h1>
   
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </button>
    </div>
  );
};

export default Services;
