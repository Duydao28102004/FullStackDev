import React from "react";

const LeftPanel = () => {
    return (
      <section className="py-2 px-4 ml-16 mr-8">
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

  export default LeftPanel