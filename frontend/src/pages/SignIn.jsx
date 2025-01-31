import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import herobg from "../assets/bgpattern4.jpg";
import apiUrl from "../api";
const SignIn = ({ setIsUserSignedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  // Validation function
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${apiUrl}/api/users/signin`, formData);

      const { token, message } = response.data;

      // Store auth token
      localStorage.setItem("authToken", token);

      // Update signed-in state
      setIsUserSignedIn(true);

      setMessage(message || "Sign-in successful!");

      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error during sign-in:", error);

      const errorMessage =
        error.response?.data?.message || "Sign-in failed. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <h1 className="text-4xl font-bold text-purple-900 mb-6">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-3 border bg-white  text-black border-gray-300 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full p-3 border bg-white text-black border-gray-300 rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600"
          }`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="flex gap-2 my-2">
        <p className="text-slate-700">Don't have an account?</p>
        <Link to="/SignUp" className="text-blue-500 underline">
          Sign Up
        </Link>
      </div>

      {/* Message */}
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default SignIn;
