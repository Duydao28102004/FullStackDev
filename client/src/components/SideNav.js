import React from "react"
import { useState } from "react"
import IconButton from "./IconButton"
import Modal from "./Modal"
import { useNavigate } from "react-router-dom"


export default function SideNav() {

    const [selectedButton, setSelectedButton] = useState("Home");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };


    // ADJUST THIS FUNCTION TO LOGOUT THE USER

    // const logoutUser = async () => {
    //     try {
    //         const response = await fetch('/api/logout', {
    //             method: 'POST',
    //             credentials: 'include' // Include cookies if using session-based auth
    //         });
    //         if (response.ok) {
    //             navigate("/login");
    //         } else {
    //             console.error("Failed to log out");
    //         }
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };

    const handleConfirmLogout = () => {
        // logoutUser(); // Call the logout function here only after have connected the backend
        navigate("/login");
    }

    const getButtonClassName = (buttonName) => {
        return selectedButton === buttonName 
            ? "bg-blue-300 py-1 px-2 rounded-md" 
            : "hover:bg-gray-300 hover:rounded-md";
    };

    return (
        <>
            <div className="flex flex-col justify-between py-4 bg-gray-200 w-1/6 h-screen sticky">        
                {/* Upper Part of the Side Navigation */}
                <div>
                    {/* Home Page Navigation == Refresh The Feed*/}
                    <IconButton
                        icon={
                            <img 
                                src="/assets/images/home.svg" 
                                alt="Home Icon" 
                                className="h-6 w-6"
                            />
                        }
                        text={"Home"}
                        onClick={() => {handleButtonClick("Home")}}
                        className={getButtonClassName("Home")}
                    />
                    
                    {/* User Profile Navigation */}
                    <IconButton
                        icon={
                            <img src="/assets/images/user.svg" alt="User Icon" className="h-6 w-6"/>
                        }
                        text={"User Profile"}
                        onClick={() => {handleButtonClick("User Profile")}}
                        className={getButtonClassName("User Profile")}
                    />
                    {/* Friends List Navigation */}
                    <IconButton
                        icon={
                            <img src="/assets/images/friends.svg" alt="Friends Icon" className="h-6 w-6"/>
                        }
                        text={"Friends"}
                        onClick={() => {handleButtonClick("Friends")}}
                        className={getButtonClassName("Friends")}
                    />
                    {/* Groups List Navigation */}
                    <IconButton
                        icon={
                            <img src="/assets/images/users-group.svg" alt="Groups Icon" className="h-6 w-6"/>
                        }
                        text={"Groups"}
                        onClick={() => {handleButtonClick("Groups")}}
                        className={getButtonClassName("Groups")}
                    />
                </div>

                {/* Lower Part of the Side Navigation */}
                <div>
                    {/* Settings Navigation */}
                    <IconButton
                        icon={
                            <img src="/assets/images/settings.svg" alt="Settings Icon" className="h-6 w-6"/>
                        }
                        text={"Settings"}
                        onClick={() => {handleButtonClick("Settings")}}
                        className={getButtonClassName("Settings")}
                    />
                    {/* Help Navigation */}
                    <IconButton
                        icon={
                            <img src="/assets/images/help.svg" alt="Help Icon" className="h-6 w-6"/>
                        }
                        text={"Help"}
                        onClick={() => {handleButtonClick("Help")}}
                        className={getButtonClassName("Help")}
                    />
                    {/* Logout Navigation */}
                    <IconButton
                        icon={
                            <img src="/assets/images/logout.svg" alt="Logout Icon" className="h-6 w-6"/>
                        }
                        text={"Logout"}
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

            {/* Logout Modal Confirmation */}
            <Modal 
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleConfirmLogout}
            />
        </>
    )
}