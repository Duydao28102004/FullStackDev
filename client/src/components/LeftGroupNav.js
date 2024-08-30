import React from "react";

const LeftGroupNav = () => {
    return (
        <section className="py-2 px-4 ml-10 mr-6">
            <div className="w-[100%] h-[110%] rounded-lg shadow-lg">

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search for group"
                        className="w-full px-4 py-2 rounded-full border border-gray-300"
                    />
                </div>
                
                <div className="space-y-2">
                    <button className="w-full flex items-center bg-[#3F72AF] text-white py-2 px-4 rounded-lg shadow">
                        <span className="mr-2">📅</span> Your Group's Feed
                    </button>
                    <button className="w-full flex items-center bg-[#3F72AF] text-white py-2 px-4 rounded-lg shadow">
                        <span className="mr-2">🔍</span> Explore more Groups
                    </button>
                    <button className="w-full flex items-center bg-[#3F72AF] text-white py-2 px-4 rounded-lg shadow">
                        <span className="mr-2">➕</span> Create a new group
                    </button>
                </div>
                
                <br/>
                
                <div>
                    <h2 className="text-lg font-bold mb-2">Groups under your management:</h2>
                    <div className="space-y-4">
                        {/* Group A */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-800 rounded mr-4"></div>
                            <div>
                                <h3 className="font-bold">Group A</h3>
                                <p className="text-sm text-gray-500">Most recent activity: 2 months ago</p>
                            </div>
                        </div>
                        {/* Group B */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-800 rounded mr-4"></div>
                            <div>
                                <h3 className="font-bold">Group B</h3>
                                <p className="text-sm text-gray-500">Most recent activity: 1 month ago</p>
                            </div>
                        </div>
                        {/* Group C */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-800 rounded mr-4"></div>
                            <div>
                                <h3 className="font-bold">Group C</h3>
                                <p className="text-sm text-gray-500">Most recent activity: 1 week ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeftGroupNav;
