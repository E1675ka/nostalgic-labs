import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import herobg from "../assets/bgpattern4.jpg";

const SignUp = ({ setIsUserSignedUp }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      formIsValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      formIsValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );

      setMessage(response.data.message || "Sign-up successful!");

      // Ensure setIsUserSignedUp is defined before calling
      if (setIsUserSignedUp) setIsUserSignedUp(true);

      setTimeout(() => navigate("/SignIn"), 2000);
    } catch (error) {
      console.error("Error during sign up:", error);
      setMessage("Error during sign-up, please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
      className="h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <h1 className="text-4xl text-black font-bold mb-6">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        {["firstName", "lastName", "email", "phone", "password"].map(
          (field) => (
            <div key={field} className="mb-4">
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className={`w-full p-3 border bg-white text-black border-gray-300 rounded-md ${
                  errors[field] ? "border-red-500" : ""
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          )
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 my-2">
        <p className="text-slate-700">Already have an account?</p>
        <Link to="/SignIn" className="text-blue-500 underline">
          Sign In
        </Link>
      </div>

      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default SignUp;
