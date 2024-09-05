import React from 'react';
import { useState } from 'react';
import IconButton from './IconButton';

export default function LeftFriendNav( { onSelectContent } ) {

    const [selectedButton, setSelectedButton] = useState("Home");

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        onSelectContent(buttonName);
    }

    const getButtonClassName = (buttonName) => {
        let baseClass = "hover:bg-gray-300 hover:rounded-md";
        if (selectedButton === buttonName) {
            baseClass = "bg-blue-300 py-1 px-2 rounded-md";
        }
        return baseClass;
    };

    return (
        <div className="w-full flex flex-col py-4 bg-gray-200 h-screen">
            <h1 className='px-4 text-3xl font-bold my-4'>
                Friends
            </h1>
            <div className="flex flex-col">
                <IconButton 
                    icon="./assets/friends.svg"
                    text="Home"
                    onClick={() => { handleButtonClick("Home") }}
                    className={getButtonClassName("Home")}
                />
                <IconButton 
                    icon="./assets/friend-requests.svg"
                    text="Friend Requests"
                    onClick={() => { handleButtonClick("Friend Requests") }}
                    className={getButtonClassName("Friend Requests")}
                />
                <IconButton 
                    icon="./assets/friend-suggestions.svg"
                    text="Suggestions"
                    onClick={() => { handleButtonClick("Friend Suggestions") }}
                    className={getButtonClassName("Friend Suggestions")}
                />
                <IconButton 
                    icon="./assets/all-friends.svg"
                    text="All Friends"
                    onClick={() => { handleButtonClick("All Friends") }}
                    className={getButtonClassName("All Friends")}
                />
            </div>
        </div>
    )
}