import React, { useState } from 'react';
import PostModal from './AddPost';

const WritePost = ({user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative flex flex-col w-[70%] py-2 px-4 mx-auto my-2 bg-gray-300 rounded-md z-50">
            <div className="flex items-center space-x-4">
                <img
                    src={user.avatar}
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

            {isModalOpen && (
                <PostModal
                    onClose={handleCloseModal}
                    userAvatar={user.avatar}
                    userName={user.username}
                />
            )}
        </div>
    );
};

export default WritePost;
