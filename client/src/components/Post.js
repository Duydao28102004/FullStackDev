import React, { useState } from "react";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import DropdownMenu from "./DropDownMenu";
import ReactionMenu from "./ReactionMenu"; // Import the ReactionMenu component

export default function Post({ avatar, name, publishedDate, content }) {
    const [reaction, setReaction] = useState(""); // State to manage the reaction
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false); // State to manage reaction menu visibility
    const [comments, setComments] = useState([]); // State to manage comments
    const [newComment, setNewComment] = useState(""); // State to manage new comment input

    const handleReaction = (selectedReaction) => {
        if (reaction === selectedReaction) {
            setReaction(""); // Unreaction
        } else {
            setReaction(selectedReaction);
        }
        setIsReactionMenuOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleReactionMenu = () => {
        setIsReactionMenuOpen(!isReactionMenuOpen);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment(""); // Clear the input field after adding a comment
        }
    };

    return (
        <div className="relative flex flex-col w-[70%] py-2 px-4 mx-auto my-2 bg-gray-300 rounded-md">
            {/* User's Post Avatar, Name, and Post Editing Section */}
            <div className="flex justify-between py-2 px-4">
                {/* User's Avatar and Name */}
                <div className="flex">
                    <div className="h-12 w-12">
                        <img 
                            src={avatar} 
                            alt={name}
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
                <div className="flex justify-end relative">
                    <button 
                        className="hover:bg-gray-400 hover:rounded-full px-2 py-2"
                        onClick={toggleDropdown}
                    >
                        ...
                    </button>
                    {isDropdownOpen && (
                        <DropdownMenu />
                    )}
                </div>
            </div>
            <div className="">
                <p className="text-base font-normal py-2 px-4">
                    {content}
                </p>
            </div>
                
            {/* Post Actions Section */}
            <div className="flex justify-end py-2 px-2 relative">
                <div className="relative">
                    <IconButton
                        icon={reaction ? `/assets/images/react-${reaction}.png` : "/assets/images/react-like.png"}
                        text={reaction || "Like"}
                        onClick={toggleReactionMenu}
                        className={`mx-1 hover:bg-gray-400 hover:rounded-md ${reaction ? "text-blue-800 scale-110 transition-transform duration-300 ease-in-out" : ""}`}
                    />
                    {isReactionMenuOpen && (
                        <ReactionMenu onReact={handleReaction} />
                    )}
                </div>
            </div>

            {/* Comment Section */}
            <div className="mt-4">
                <div className="flex">
                    <input
                        type="text"
                        className="flex-1 border rounded-l-md px-4 py-2"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                        onClick={handleAddComment}
                    >
                        Comment
                    </button>
                </div>
                <div className="mt-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-sm bg-gray-200 p-2 rounded-md">
                                {comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};