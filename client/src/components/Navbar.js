import React, { useState } from "react";
import { useSession } from "../LoginData";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData } = useSession();
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const navigate = useNavigate(); // Hook for navigation

  // Reusable function to set the search query
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the search page with the query
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="shadow-md my-5 h-[5%]">
      <div className="w-[100%] px-4 py-4 flex items-center justify-between bg-[#DBE2EF] shadow-lg">
        <Link to="/">
          <div className="flex items-center pl-20">
            <img src="" alt="Logo" className="h-10 w-[100%] mr-2" />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-20">
          <form onSubmit={handleSearch} className="relative w-[85%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-[3%] h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search for friends here..."
              className="w-[100%] pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)} // Use the reusable function to update query
            />
          </form>
        </div>

        <div className="flex items-center space-x-16 pr-20">
          {/* User Icon and Name */}
          <Link to={`/user/${userData.userid}`}>
            <div className="flex items-center space-x-2">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="text-gray-700 font-medium">
                <span>{userData.username}</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Settings Button */}
            <button className="text-gray-700 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            {/* Notification Button */}
            <button className="text-gray-700 hover:text-blue-500">
              <svg
                className="h-[100%] w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.16V11a7.003 7.003 0 00-5-6.71V4a2 2 0 10-4 0v.29A7.003 7.003 0 004 11v3.159c0 .428-.152.83-.595 1.178L2 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Message Button */}
            <button className="text-gray-700 hover:text-blue-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m-6 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
