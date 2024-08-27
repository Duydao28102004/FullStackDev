import React from 'react'
import WritePost from '../components/WritePost';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 shadow-md"> 
      <div className="w-[100%] px-4 py-4 flex items-center justify-between bg-[#DBE2EF] shadow-lg">
        
        <div className="flex items-center pl-20">
          <img src="" alt="Logo" className="h-10 w-[100%] mr-2" />
        </div>
        
        {/* Search Bar */}
        <div className="flex-grow mx-20">
          <div className='relative w-[85%]'>
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="w-[3%] h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

          <input
            type="text"
            placeholder="Search for friends here..."
            className="w-[100%] pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
          
        </div>
        
       
        <div className="flex items-center space-x-16 pr-20">
          
          {/* User Icon and Name */}
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            <div className="text-gray-700 font-medium">
              <span>User A</span>
              <span className="text-sm text-gray-500 block">@UserA</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
              {/* Settings Button */}
              <button className="text-gray-700 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-8 px-6">
      <div className="bg-[#DBE2EF] rounded-lg shadow-lg py-2 ml-20 mr-20">
        <div className="flex justify-between items-center max-w-1xl mx-auto p-16 ">
          {/*User Info */}
          <div className="flex items-center space-x-4">
            {/* User Icon and Name */}
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

              <div>
                <span className="text-gray-700 font-medium text-lg block">User A</span>
                <span className="text-sm text-gray-500 block">@UserA</span>
              </div>
            </div>

            {/* Number of Friends */}
            <div className="ml-2">
              <span className="text-gray-700 text-md font-small">300 Friends</span>
            </div>
          </div>

          {/* Edit Button */}
          <div>
            <button className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              <span>Edit Personal Page</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeftPanel = () => {
  return (
    <section className="bg-gray-100 py-2 px-4 ml-16 mr-8">
      <div className="w-[90%] rounded-lg shadow-lg">
        <div className="mb-6 p-4 bg-[#DBE2EF] rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Introduction about Yourself</h2>
          <button className="w-full bg-[#3F72AF] py-2 rounded mb-2">Add Autobiography</button>
          <button className="w-full bg-[#3F72AF] py-2 rounded">Edit Detail Description</button>
        </div>
        <br/>
        <div className="mb-6 p-4 bg-[#DBE2EF] rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Your Images</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="w-full h-20 bg-blue-800 rounded"></div>
            <div className="w-full h-20 bg-blue-800 rounded"></div>
            <div className="w-full h-20 bg-blue-800 rounded"></div>
            <div className="w-full h-20 bg-blue-800 rounded"></div>
            <div className="w-full h-20 bg-blue-800 rounded"></div>
            <div className="w-full h-20 bg-blue-800 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Settings = () => {
  return (
    <section className="bg-gray-100 px-6 ml-4">
      <div className="w-1/3 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Settings</h2>
        <div className="flex space-x-2">
          <button className="w-10 bg-blue-600 text-white py-2 rounded mb-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
          <span className='pl-1 pt-2'>Settings</span>
        </div>
        <div className="flex space-x-2">
          <button className="w-10 bg-red-600 text-white py-2 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </button>
          <span className='pl-1 pt-2'>Logout</span>
        </div>
      </div>
    </section>
  );
};

const Detail = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <div className="flex px-2 py-8 mx-12 mr-20">
        <LeftPanel />
        <div className="flex-grow ml-8">
          <WritePost />
        </div>
      </div>
      <Settings/>
    </div>
  )
}

export default Detail