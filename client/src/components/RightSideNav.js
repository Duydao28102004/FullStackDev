import React, { useState } from "react";
import AcceptFriend from "./AcceptFriend";
import { useNavigate } from "react-router-dom";

export default function RightSideNav() {
    const navigate = useNavigate();

    // Initial friend requests data
    const initialRequests = [
        { id: 1, avatar: "/assets/images/test-avatar.jpg", name: "John Doe" },
        { id: 2, avatar: "/assets/images/test-avatar.jpg", name: "Jane Doe" },
        { id: 3, avatar: "/assets/images/test-avatar.jpg", name: "John Smith" },
        { id: 4, avatar: "/assets/images/test-avatar.jpg", name: "Jane Smith" },
        { id: 5, avatar: "/assets/images/test-avatar.jpg", name: "John Doe" },
        { id: 6, avatar: "/assets/images/test-avatar.jpg", name: "Jane Doe" },
        { id: 7, avatar: "/assets/images/test-avatar.jpg", name: "John Smith" },
        { id: 8, avatar: "/assets/images/test-avatar.jpg", name: "Jane Smith" },
        { id: 9, avatar: "/assets/images/test-avatar.jpg", name: "John Doe" },
        { id: 10, avatar: "/assets/images/test-avatar.jpg", name: "Jane Doe" },
        { id: 11, avatar: "/assets/images/test-avatar.jpg", name: "John Smith" },
        { id: 12, avatar: "/assets/images/test-avatar.jpg", name: "Jane Smith" }
    ];

    // State to manage remaining requests
    const [remainingRequests, setRemainingRequests] = useState(initialRequests);
    // State to manage the last 5 pending requests
    const [pendingRequests, setPendingRequests] = useState(initialRequests.slice(-5));
    // State to manage the total number of requests
    const [totalRequests, setTotalRequests] = useState(initialRequests.length);

    // Navigate to pending friend profile
    const navigateToPendingFriendProfile = () => {
        navigate("/pending-friend-profile");
    }

    // Navigate to pending list
    const navigateToPendingList = () => {
        navigate("/pending-list");
    }

    // Handle accept friend request
    const handleAccept = (id) => {
        setRemainingRequests(prevRequests => {
            const updatedRequests = prevRequests.filter(request => request.id !== id);
            setTotalRequests(updatedRequests.length);
            setPendingRequests(updatedRequests.slice(-5));
            return updatedRequests;
        });
        console.log("Accepted request with id:", id);
    }

    // Handle reject friend request
    const handleReject = (id) => {
        setRemainingRequests(prevRequests => {
            const updatedRequests = prevRequests.filter(request => request.id !== id);
            setTotalRequests(updatedRequests.length);
            setPendingRequests(updatedRequests.slice(-5));
            return updatedRequests;
        });
        console.log("Rejected request with id:", id);
    }

    return (
        <div className="flex flex-col w-1/4 h-screen bg-gray-200 py-4 overflow-y-auto sticky">
            {/* Pending Friend Requests Section */}
            <div className="flex justify-between mx-2">
                <h1 className="font-bold text-lg text-center px-2 py-2 relative">
                    Friend Requests
                    <span className="text-sm text-gray-500 absolute"> ({totalRequests})</span>
                </h1>
                {/* Clickable Button to View All Pending Friend Requests */}
                <button 
                    className="hover:bg-gray-300 text-blue-500 font-normal text-sm rounded px-2"
                    onClick={navigateToPendingList}
                >
                    View All
                </button>
            </div>

            {/* Pending Friend Requests Container */}
            <div>
                {pendingRequests.map(request => (
                    <AcceptFriend
                        key={request.id}
                        avatar={request.avatar}
                        name={request.name}
                        onAccept={() => handleAccept(request.id)}
                        onReject={() => handleReject(request.id)}
                        onProfileNavigate={navigateToPendingFriendProfile}
                    />
                ))}
            </div>
        </div>
    )
}