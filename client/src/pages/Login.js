import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSession } from '../LoginData';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUserData } = useSession();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmission = async (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    try {
      console.log('API sent');
      const response = await axios.post('http://localhost:3001/api/login', {
        username: username,
        password: password,
      });
      console.log('API Response:', response.data);
      updateUserData({ userid: response.data.userid });
      navigate('/');
    } catch (error) {
      console.error('Error making API request:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized (wrong username or password)
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full min-h-screen max-h-screen h-full rounded-lg shadow-lg">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/3 bg-white">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">SocialPulse</h1>
            <br></br>
            <h2 className="text-2xl font-bold mb-8">Log in</h2>
          </div>
          <form className="w-full" onSubmit={handleSubmission}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  placeholder="Username"
                  value={username} // Controlled input
                  onChange={handleUsernameChange}
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/username.svg" alt="Username Icon" className="h-5 w-5" />
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  placeholder="Password"
                  value={password} // Controlled input
                  onChange={handlePasswordChange}
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/password.svg" alt="Password Icon" className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-gray-700 text-sm">Remember Me</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Do not have an account yet?{' '}
            <a href="/register" className="text-blue-500 hover:text-blue-700">
              Sign Up Here
            </a>
          </p>
          {error && (
            <div className="mb-4 text-red-500 mx-auto flex">
              <p>{error}</p>
            </div>
          )}
          <br></br>
          <p className="text-xs text-gray-400 mt-4">© 2024 SocialPulse. All Rights Reserved. SocialPulse is a trademark of COSC2769|COSC2808 Full Stack Development - Group 16.</p>
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

export default Login;
