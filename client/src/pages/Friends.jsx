import React, { useState } from "react";
import LeftFriendNav from "../components/LeftFriendNav";
import FriendRequestCard from "../components/FriendRequestCard";

export default function FriendsPage() {

    const [selectedContent, setSelectedContent] = useState('Home');

    // Friend requests data
    const friendRequestsData = [
        { profileName: "John Doe", profileImage: "./assets/images/test-avatar.jpg" },
        { profileName: "Jane Smith", profileImage: "./assets/images/test-avatar.jpg" },
        { profileName: "Alice Johnson", profileImage: "./assets/images/test-avatar.jpg" },
        { profileName: "Bob Brown", profileImage: "./assets/images/test-avatar.jpg" },
        { profileName: "Charlie Davis", profileImage: "./assets/images/test-avatar.jpg" },
        { profileName: "Eve White", profileImage: "./assets/images/test-avatar.jpg" }
    ];

    const renderMainContent = () => {
        switch (selectedContent) {
            case 'Home':
                return "Home";
            case 'Friend Requests':
                return (
                    <div className="py-4 px-4">
                        <h1 className="text-3xl font-bold">
                            Friend Requests
                        </h1>
                        <div className="grid grid-cols-4 gap-4 py-4">
                            {friendRequestsData.map((request, index) => (
                                <FriendRequestCard
                                    key={index}
                                    profileName={request.profileName}
                                    profileImage={request.profileImage}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'Friend Suggestions':
                return "Friend Suggestions";
            case 'All Friends':
                return "All Friends";
            default:
                return (
                    <div>Select an option from the left navigation</div>
                );
        }
    }

    return (
        <div className="flex">
            <div className="w-1/6 h-screen sticky">
                <LeftFriendNav onSelectContent={setSelectedContent}/>
            </div>
            <div className="flex h-full py-4 px-2 w-full">
                {renderMainContent()}
            </div>
        </div>
    )
}