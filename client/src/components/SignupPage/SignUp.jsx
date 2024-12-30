import React, { useState, useEffect } from "react";
import SignUpImg from "../../assets/SignUpImg.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) * 0.02;
    const moveY = (clientY - window.innerHeight / 2) * 0.02;
    setMousePosition({ x: moveX, y: moveY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden border rounded-lg  my-0 mx-auto">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navyBlue to-deepBlue">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover opacity-20" />
      </div>

      {/* Main container */}
      <div className="relative w-11/12 lg:w-3/4 xl:w-3/4 bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl flex flex-col lg:flex-row overflow-hidden my-4 md:my-0">
        {/* Image Section with parallax effect */}
        <div className="lg:w-1/2 relative overflow-hidden">
          <div 
            className="w-full h-full"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            <img
              src={SignUpImg}
              alt="Sign Up Illustration"
              className="w-full h-full object-cover scale-110" // Added scale to prevent white edges during movement
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 p-8 backdrop-blur-sm ">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-white">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="mt-1 block w-full p-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full p-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full p-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="mt-1 block w-full p-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-300 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-white/20 text-white py-2 rounded-md hover:bg-white/30 transition duration-300 backdrop-blur-sm border border-white/30"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-white">
            Already have an account?{" "}
            <a href="/login" className="text-blue-300 hover:text-blue-200 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;