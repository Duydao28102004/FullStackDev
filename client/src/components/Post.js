import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import DropdownMenu from "./DropDownMenu";
import ReactionMenu from "./ReactionMenu"; // Import the ReactionMenu component
import { useSession } from "../LoginData";
import { Link } from "react-router-dom";
import PostDetailModal from "./PostDetailModal"; // Import the PostDetailModal component

export default function Post({ avatar, name, publishedDate, content, images, postId, userId }) {
    const [reaction, setReaction] = useState(""); // State to manage the reaction
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false); // State to manage reaction menu visibility
    const [comments] = useState([]); // State to manage comments
    const [reactions, setReactions] = useState([]); // State to manage reactions
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State to manage the detailed view modal
    const { userData } = useSession();

    useEffect(() => {
        // Fetch the reactions for the post when the component mounts
        const fetchReactions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/reactions/getReactions', {
                    params: { postid: postId },
                });
                setReactions(response.data);
                const userReaction = response.data.find(r => r.user._id === userData.userid);
                if (userReaction) {
                    setReaction(userReaction.type);
                }
            } catch (error) {
                console.error("Error fetching reactions:", error);
            }
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

    const toggleDetailModal = () => {
        setIsDetailModalOpen(!isDetailModalOpen);
    };

    return (
        <div className="relative flex flex-col w-[70%] py-2 px-4 mx-auto my-2 bg-gray-300 rounded-md">
            {/* User's Post Avatar, Name, and Post Editing Section */}
            <div className="flex justify-between py-2 px-4">
                {/* User's Avatar and Name */}
                <div className="flex">
                    <Link to={`/user/${userId}`} className="h-12 w-12">
                        <img 
                            src={avatar} 
                            alt={name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </Link>
                    <div className="flex flex-col">
                        <Link to={`/user/${userId}`} className="text-base font-semibold text-justify px-2">
                            {name}
                        </Link>
                        <p className="text-sm font-light px-2">
                            {new Date(publishedDate).toLocaleString()} {/* Convert ISO to local date/time */}
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
                            alt={`${index + 1}`} 
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
                <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={toggleDetailModal}
                >
                    View Details
                </button>
            </div>

            {/* Post Detail Modal */}
            {isDetailModalOpen && (
                <PostDetailModal
                    avatar={avatar}
                    name={name}
                    publishedDate={publishedDate}
                    content={content}
                    images={images}
                    comments={comments}
                    onClose={toggleDetailModal}
                    postId={postId}
                    reactions={reactions}
                />
            )}
        </div>
    );
}

Post.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visibility: PropTypes.string.isRequired, // Add this prop type for visibility
};
