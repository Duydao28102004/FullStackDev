import React, { useState } from 'react';
import axios from 'axios';

const AddPost = ({ onClose, user, groupid }) => {
    const [isMediaBoxVisible, setIsMediaBoxVisible] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [imageStrings, setImageStrings] = useState([]); // Store Base64 strings
    const [previews, setPreviews] = useState([]); // Store previews of selected files
    const [visibility, setVisibility] = useState('public'); // Default visibility

    const handleMediaToggle = () => {
        setIsMediaBoxVisible(!isMediaBoxVisible);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert to array

        files.forEach(file => {
            const reader = new FileReader();
            
            // Create Base64 string for image
            reader.onloadend = () => {
                setImageStrings(prevState => [...prevState, reader.result]);
                setPreviews(prevPreviews => [...prevPreviews, reader.result]);
            };

            reader.readAsDataURL(file); // Read file as Base64
        });
    };

    const handlePublish = async () => {
        console.log('Publishing post...');
        const formData = {
            userid: user._id, // Assuming you have user data in your state
            content: postContent,
            images: imageStrings, // Base64 strings
            visibility: visibility, // Visibility selected by user
        };

        try {
            if (groupid) {
                const response = await axios.post(`http://localhost:3001/api/groups/createPost`, {
                    userid: user._id, // Assuming you have user data in your state
                    groupid: groupid,
                    content: postContent,
                    images: imageStrings, // Base64 strings
                    visibility: 'public', // Visibility selected by user
                });
                console.log('Post created:', response.data);
                onClose();
                return;
            }
            const response = await axios.post('http://localhost:3001/api/posts/createPost', formData);
            console.log('Post created:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        }
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
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="ml-4">Hey {user.username}, what are your thoughts?</p>
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
                    <div className="px-4 py-2">
                        <div className="flex flex-col space-y-4">
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
                                    multiple // Allow multiple file selection
                                    onChange={handleFileChange}
                                />
                            </label>

                            {previews.length > 0 && (
                                <div className="flex flex-wrap mt-4">
                                    {previews.map((preview, index) => (
                                        <img
                                            key={index}
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            className="w-24 h-24 object-cover m-1 rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Visibility Selection */}
                <div className="p-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Post Visibility</label>
                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none"
                    >
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                    </select>
                </div>

                <div className='flex justify-between'>
                    <div className="flex justify-between items-center p-4">
                        <div className="text-sm p-2">Add into your post </div>
                        <div className="flex space-x-2">
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
