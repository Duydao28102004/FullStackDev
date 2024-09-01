import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import DropdownMenu from "./DropDownMenu";
import ReactionMenu from "./ReactionMenu"; // Import the ReactionMenu component
import { useSession } from '../LoginData';

export default function Post({ avatar, name, publishedDate, content, images, postId }) {
    const [reaction, setReaction] = useState(""); // State to manage the reaction
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false); // State to manage reaction menu visibility
    const [comments, setComments] = useState([]); // State to manage comments
    const [newComment, setNewComment] = useState(""); // State to manage new comment input
    const [reactions, setReactions] = useState([]); // State to manage reactions
    const { userData } = useSession();

    useEffect(() => {
        // Fetch the reactions for the post when the component mounts
        const fetchReactions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/reactions/getReactions', {
                    params: { postid: postId },
                });
                setReactions(response.data);
                console.log(response.data);
                const userReaction = response.data.find(r => r.user._id === userData.userid);
                if (userReaction) {
                    setReaction(userReaction.type);
                }
            } catch (error) {
                console.error("Error fetching reactions:", error);
            }
            console.log(postId)
        };

        fetchReactions(); // Call the function

    }, [postId, userData.userid]);
    const handleReaction = async (selectedReaction) => {
        try {
            if (reaction === selectedReaction) {
                setReaction("");
                await axios.post('http://localhost:3001/api/reactions/deleteReaction', {

                    userid: userData.userid,
                    postid: postId,
                });
            } else {
                // Send the reaction to the server
                await axios.post('http://localhost:3001/api/reactions/react', {
                    userid: userData.userid,
                    postid: postId,
                    type: selectedReaction,
                });
                setReaction(selectedReaction);
            }
            setIsReactionMenuOpen(false);

            

            // Fetch updated reactions after the reaction is added/updated
            const response = await axios.get('http://localhost:3001/api/reactions/getReactions', {
                params: { postid: postId },
            });
            setReactions(response.data);

        } catch (error) {
            console.error("Error handling reaction:", error);
        }
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-2">
                    {images.slice(0, 5).map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt={`Post Image ${index + 1}`} 
                            className="w-full h-48 object-cover rounded-md"
                        />
                    ))}
                </div>
            </div>
                
            {/* Post Actions Section */}
            <div className="flex justify-end py-2 px-2 relative">
                <div className="relative">
                    <IconButton
                        icon={reaction ? `/assets/images/react-${reaction}.png` : "/assets/images/react-like.png"}
                        text={reaction || "like"}
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
    images: PropTypes.arrayOf(PropTypes.string), // Add this prop type for images
    postId: PropTypes.string.isRequired,
};
