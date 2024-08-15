import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full min-h-screen max-h-screen h-full rounded-lg shadow-lg">
        {/* Left Side - Sign Up Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/3 bg-white">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">SocialPulse</h1>
            <br />
            <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  placeholder="Username"
                  autoFocus
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/username.svg" alt="Username Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address (e.g., user@example.com)"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  placeholder="Email"
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/email.svg" alt="Email Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  placeholder="Password"
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/password.svg" alt="Password Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Re-enter Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  placeholder="Re-enter Password"
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/password.svg" alt="Password Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs italic mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Sign In Here
            </a>
          </p>
          <br />
          <p className="text-xs text-gray-400 mt-4 text-center">© 2024 SocialPulse. All Rights Reserved. SocialPulse is a trademark of COSC2769|COSC2808 Full Stack Development - Group 16.</p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full md:w-2/3">
          <img
            src="/assets/images/2437.jpg"
            alt="Side Image"
            className="object-cover h-full w-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
