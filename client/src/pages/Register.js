import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    base64Image: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          file,
          base64Image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const selectedImage = formData.base64Image;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        base64Image: formData.base64Image,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error making API request:', error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full min-h-screen max-h-screen h-full rounded-lg shadow-lg">
        {/* Left Side - Sign Up Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/3 bg-white">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">FaceGram</h1>
            <br />
            <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
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
                  <img src="/assets/username.svg" alt="Username Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="mb-6">
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
                  <img src="/assets/email.svg" alt="Email Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="mb-6">
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
                  pattern="(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}"
                  title="Password must contain at least 8 characters, including one uppercase letter and one number."
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/password.svg" alt="Password Icon" className="h-5 w-5" />
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
                  <img src="/assets/password.svg" alt="Password Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            {selectedImage && (
                <div>
                  <img src={selectedImage} alt="Selected" className="mt-4 mb-2 w-full max-h-96 object-cover" />
                </div>
            )}
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
          <p className="text-xs text-gray-400 mt-4 text-center">© 2024 FaceGram. All Rights Reserved. FaceGram is a trademark of COSC2769|COSC2808 Full Stack Development - Group 16.</p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full md:w-2/3">
          <img
            src="/assets/images/2437.jpg"
            alt="background"
            className="object-cover h-full w-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
