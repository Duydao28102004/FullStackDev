import React from "react";
import PropTypes from 'prop-types';

// Define the ActionButton component
const ActionButton = ({ onClick, className, text }) => {
    const handleClick = (event) => {
        event.stopPropagation();
        onClick();
    }

    return (
        <button 
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 rounded ml-2 ${className}`}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

ActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    text: PropTypes.string.isRequired
};

export default function AcceptFriend({ avatar, name, onAccept, onReject, onProfileNavigate, className }) {
    return (
        <div className={`flex items-center justify-start py-2 px-2 mx-2 cursor-pointer hover:bg-gray-300 hover:rounded-lg ${className}`} onClick={onProfileNavigate}>
            <div className="h-12 w-12">
                <img 
                    src={avatar} 
                    alt={name}
                    className="h-full w-full rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <p className="text-base font-semibold px-2">
                    {name}
                </p>
                <div className="flex justify-start w-full">
                    <ActionButton 
                        onClick={onAccept}
                        className="bg-blue-500 hover:bg-blue-600"
                        text="Accept"
                    />
                    <ActionButton 
                        onClick={onReject}
                        className="bg-gray-500 hover:bg-gray-600"
                        text="Reject"
                    />
                </div>
            </div>
        </div>
    );
}

AcceptFriend.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    onProfileNavigate: PropTypes.func,
    className: PropTypes.string
};