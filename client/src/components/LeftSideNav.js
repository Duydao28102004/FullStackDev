import React from "react";
import { useState } from "react";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";
import { useSession } from "../LoginData";

export default function LeftSideNav({ onSelectContent, user }) {
    const { deleteUserData } = useSession();  // Adjusted to object destructuring
    const [selectedButton, setSelectedButton] = useState("Home");
    const navigate = useNavigate();

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        onSelectContent(buttonName);
    };

    const handleLogoutClick = () => {
        deleteUserData();
        navigate("/login");
    };

    const getButtonClassName = (buttonName) => {
        let baseClass = "hover:bg-gray-300 hover:rounded-md";
        if (selectedButton === buttonName) {
            baseClass = "bg-blue-300 py-1 px-2 rounded-md";
        }
        if (buttonName === "Logout") {
            baseClass += " text-red-500"; // Add red color for Logout button
        }
        return baseClass;
    };

    return (
        <>
            <div className="flex flex-col justify-between py-4 bg-gray-200 h-screen sticky overflow-y-auto">
                {/* Upper Part of the Side Navigation */}
                <div>
                    <div className="flex items-center ml-2 my-4">
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full"
                        />
                        <p class="text-xl ml-[4%]">Welcome back, {user.username}</p>
                    </div>
                    {/* Home Page Navigation == Refresh The Feed */}
                    <IconButton
                        icon="/assets/home.svg"
                        text="Home"
                        onClick={() => { handleButtonClick("Home") }}
                        className={getButtonClassName("Home")}
                    />

                    {/* User Profile Navigation */}
                    <IconButton
                        icon="/assets/user.svg"
                        text="User Profile"
                        onClick={() => { handleButtonClick("User Profile") }}
                        className={getButtonClassName("User Profile")}
                    />
                    {/* Friends List Navigation */}
                    <IconButton
                        icon="/assets/friends.svg"
                        text="Friends"
                        onClick={() => { handleButtonClick("Friends") }}
                        className={getButtonClassName("Friends")}
                    />
                    {/* Groups List Navigation */}
                    <IconButton
                        icon="/assets/users-group.svg"
                        text="Groups"
                        onClick={() => { handleButtonClick("Groups") }}
                        className={getButtonClassName("Groups")}
                    />
                </div>

                {/* Lower Part of the Side Navigation */}
                <div>
                    {/* Settings Navigation */}
                    <IconButton
                        icon="/assets/settings.svg"
                        text="Settings"
                        onClick={() => { handleButtonClick("Settings") }}
                        className={getButtonClassName("Settings")}
                    />
                    {/* Help Navigation */}
                    <IconButton
                        icon="/assets/help.svg"
                        text="Help"
                        onClick={() => { handleButtonClick("Help") }}
                        className={getButtonClassName("Help")}
                    />
                    {/* Logout Navigation */}
                    <IconButton
                        icon="/assets/logout.svg"
                        text="Logout"
                        onClick={handleLogoutClick}
                        className={getButtonClassName("Logout")}
                    />

                    {/* Copy Right */}
                    <div>
                        <p className="text-center text-xs text-gray-500">© 2024 SocialPulse. All Rights Reserved.</p>
                        <p className="text-center text-xs text-gray-500">Version 1.0.0</p>
                    </div>
                </div>
            </div>
        </>
    );
}
