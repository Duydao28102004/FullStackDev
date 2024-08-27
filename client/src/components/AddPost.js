import React, { useState } from 'react';

const AddPost = ({ onClose, userAvatar, userName }) => {
    const [isMediaBoxVisible, setIsMediaBoxVisible] = useState(false); 
    const [postContent, setPostContent] = useState(""); 
    const [selectedFile, setSelectedFile] = useState(null); 

    const handleMediaToggle = () => {
        setIsMediaBoxVisible(!isMediaBoxVisible);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); 
    };

    const handlePublish = () => {
        const formData = new FormData();
        formData.append('text', postContent);
        if (selectedFile) {
            formData.append('file', selectedFile); 
        }


        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-bold">Create a post</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &#10005;
                    </button>
                </div>

              
                <div className="flex items-center p-4">
                    <img
                        src={userAvatar} 
                        alt={userName} 
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="ml-4">Hey {userName}, what are your thoughts?</p>
                </div>

          
                <div className="relative p-4">
                    <textarea
                        placeholder="Write something here...."
                        className={`w-full p-2 overflow-hidden border rounded-lg focus:outline-none resize-none ${isMediaBoxVisible ? 'h-8' : 'h-32'}`}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        style={{ paddingRight: '2.5rem' }} 
                    />
                    <img
                        src="/assets/images/happy-face.png" 
                        alt="Emoji"
                        className="w-6 h-6 absolute bottom-6 right-5 cursor-pointer"
                    />
                </div>

                {isMediaBoxVisible && (
                    <div className="px-4 py-2 ">
                        <div className="flex justify-end items-center">
                          
                        </div>
                        <div className="flex items-center justify-center w-full mt-4">
                            
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg 
                                        className="w-8 h-8 mb-4 text-gray-500" 
                                        aria-hidden="true" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 20 16"
                                    >
                                        <path 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Add photos/videos</span></p>
            
                                </div>
                                <input 
                                    id="dropzone-file" 
                                    type="file" 
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                )}

                <div className='flex justify-between'>
                    <div className="flex justify-between items-center p-4">
                        <div className="text-sm p-2">Add into your post </div>
                        <div className="flex space-x-2">
                            <button
                                className="w-8 h-8 bg-green-600 rounded-full flex justify-center items-center"
                            >
                                <img
                                    src="/assets/images/map.png"
                                    alt="Upload"
                                    className="w-4 h-4 inline-block"
                                />
                            </button>
                            <button
                                onClick={handleMediaToggle}
                                className="w-8 h-8 bg-green-500 rounded-full flex justify-center items-center"
                            >
                                <img
                                    src="/assets/images/add-photo.svg" 
                                    alt="Upload"
                                    className="w-4 h-4 inline-block"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <button
                            onClick={handlePublish}
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
                        >
                            Publish
                        </button>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default AddPost;
