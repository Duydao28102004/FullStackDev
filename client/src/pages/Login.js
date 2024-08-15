import React from 'react';

const Login = () => {
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
          <form className="w-full">
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
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/username.svg" alt="Username Icon" className="h-5 w-5"/>
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
                  title="Please enter password"
                  required
                  
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/assets/images/password.svg" alt="Password Icon" className="h-5 w-5"/>
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
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up Here
            </a>
            
          </p>
          <br></br>
          <p className="text-xs text-gray-400 mt-4">© 2024 SocialPulse. All Rights Reserved. SocialPulse is a trademark of COSC2769|COSC2808 Full Stack Development -  Group 16.
          </p>
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

export default Login;
