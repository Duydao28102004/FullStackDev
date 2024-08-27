import React, { useState } from 'react';
import PostModal from './AddPost';

const WritePost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative flex flex-col w-[60%] py-2 px-4 mx-auto my-2 bg-gray-300 rounded-md z-50">
            <div className="flex items-center space-x-4">
                <img
                    src="/assets/images/test-avatar.jpg"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <input
                    type="text"
                    placeholder="Write something here..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none"
                    onClick={handleOpenModal}
                    readOnly
                />
            </div>
            <div className="flex justify-around mt-4">
                <button
                    onClick={handleOpenModal}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                >
                    <img 
                        src='/assets/images/write.svg'
                        className="icon-write-post rounded-full p-1 bg-blue-500 inline-block" 
                    />
                    <span>Write a Post</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                    <img 
                        src='/assets/images/add-photo.svg'
                        className="icon-picture rounded-full p-1 bg-blue-500 inline-block"
                    />
                    <span>Pictures</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                    <img 
                        src='/assets/images/add-vid.svg'
                        className="icon-video rounded-full p-1 bg-blue-500 inline-block" 
                    />
                    <span>Videos</span>
                </button>
            </div>

            {isModalOpen && (
                <PostModal
                    onClose={handleCloseModal}
                    userAvatar="/assets/images/test-avatar.jpg" 
                    userName="John Doe"
                />
            )}
        </div>
    );
};

export default WritePost;
