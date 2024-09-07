import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useSession } from "../LoginData";

const PostDetailModal = ({ avatar, name, publishedDate, content, images, onClose, postId, reactions}) => {
    const [newComment, setNewComment] = useState(""); // State to manage new comment input
    const [modalComments, setModalComments] = useState([]); // Local state for comments to manage updates
    const [reactionCounts, setReactionCounts] = useState({}); // State to manage reaction counts
    const { userData } = useSession();

    useEffect(() => {
        // Fetch comments for the post when the component mounts
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/comments/${postId}`);
                setModalComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments(); // Call the function to fetch comments

        // Calculate reaction counts when reactions are updated
        const calculateReactionCounts = () => {
            const counts = reactions.reduce((acc, reaction) => {
                acc[reaction.type] = (acc[reaction.type] || 0) + 1;
                return acc;
            }, {});
            setReactionCounts(counts);
        };

        calculateReactionCounts(); // Call the function to initialize counts
    }, [postId, reactions]);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                // Send the new comment to the server
                const response = await axios.post('http://localhost:3001/api/comment/addComment', {
                    postid: postId,
                    userid: userData.userid,
                    content: newComment,
                });

                // Update local comments state with the newly added comment
                setModalComments([...modalComments, response.data.comment]);
                setNewComment(""); // Clear the input field after adding a comment
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:3001/api/comment/deleteComment/${commentId}`);
            // Remove the deleted comment from local state
            setModalComments(modalComments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const totalReactions = reactions.length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md max-w-lg w-full h-[80%] relative">
                <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={onClose}
                >
                    X
                </button>
                <div className="flex">
                    <img
                        src={avatar}
                        alt={name}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                        <p className="font-bold">{name}</p>
                        <p className="text-sm text-gray-500">{new Date(publishedDate).toLocaleString()}</p>
                        <p className="mt-2">{content}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-semibold">Images:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${index + 1}`}
                                className="w-full h-48 object-cover rounded-md"
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Total Reactions: {totalReactions}</p>
                    <div className="flex flex-wrap">
                        {Object.entries(reactionCounts).map(([type, count]) => (
                            <p key={type} className="flex items-center mr-4 mb-2">
                                <img
                                    src={`/assets/images/react-${type}.png`}
                                    alt={type}
                                    className="w-6 h-6 mr-2"
                                />
                                {count}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="mt-4 h-[40%]">
                    <p className="font-semibold">Comments:</p>
                    <div className="mt-4 h-[90%] overflow-y-auto">
                        {modalComments.length > 0 ? (
                            modalComments.map((comment) => (
                                <div key={comment._id} className="bg-gray-100 p-2 rounded-md my-2 flex items-start">
                                    <img
                                        src={comment.author.avatar}
                                        alt={comment.author.username}
                                        className="h-8 w-8 rounded-full object-cover mr-2"
                                    />
                                    <div>
                                        <p className="font-semibold">{comment.author.username}</p>
                                        <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                                        <p>{comment.content}</p>
                                        {userData.userid === comment.author._id && (
                                            <button
                                                className="text-red-500 mt-2"
                                                onClick={() => handleDeleteComment(comment._id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                    
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        className="flex-1 border rounded-l-md px-4 py-2 w-[70%]"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md w-[30%]"
                        onClick={handleAddComment}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

PostDetailModal.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    reactions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired
    })).isRequired,
};

export default PostDetailModal;
