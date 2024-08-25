import React, { useState } from "react";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";

const IconActionButton = ({ icon, onClick, className }) => {
    return (
        <button 
            className={`hover:bg-gray-400 hover:rounded-lg font-semibold px-2 py-2 ${className}`}
            onClick={onClick}
        >
            <img src={icon} alt={`${icon} Icon`} />
        </button>
    );
}

IconActionButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default function UsersFeedPost({ avatar, name, publishedDate, content, onReactPost, onComment, onEdit, onDelete }) {

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        onReactPost();
    }

    return (
        <div className="flex flex-col w-full py-2 px-4 my-2 bg-gray-300 rounded-md">
            {/* User's Post Avatar, Name, and Post Editing Section */}
            <div className="flex justify-between py-2 px-4">
                {/* User's Avatar and Name */}
                <div className="flex">
                    <div className="h-12 w-12">
                        <img 
                            src={avatar} 
                            alt={`name`}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-base font-semibold text-justify px-2">
                            {name}
                        </p>
                        <p className="text-sm font-light px-2">
                            {publishedDate}
                        </p>
                    </div>
                </div>

                {/* Post Editing Section */}
                <div className="flex justify-end">
                    <IconActionButton
                        icon="/assets/images/edit.svg"
                        onClick={onEdit}
                        className={`mx-1`}
                    />
                    <IconActionButton
                        icon="/assets/images/delete.svg"
                        onClick={onDelete}
                        className={`mx-1`}
                    />
                </div>
            </div>
            <div className="">
                <p className="text-base font-normal py-2 px-4">
                    {content}
                </p>
            </div>
                
            {/* Post Actions Section */}
            <div className="flex justify-end py-2 px-2">
                <IconButton
                    icon={isLiked ? "/assets/images/react-like-filled.svg" : "/assets/images/react-like.svg"}
                    text="Like"
                    onClick={handleLikeClick}
                    className={`mx-1 hover:bg-gray-400 hover:rounded-md ${isLiked ? "text-blue-800 scale-110 transition-transform duration-300 ease-in-out" : ""}`}
                />
                <IconButton
                    icon="/assets/images/comment.svg"
                    text="Comment"
                    onClick={onComment}
                    className={`mx-1 hover:bg-gray-400 hover:rounded-md`}
                />
            </div>

        </div>
    )
}

UsersFeedPost.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onReactPost: PropTypes.func.isRequired,
    onComment: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}