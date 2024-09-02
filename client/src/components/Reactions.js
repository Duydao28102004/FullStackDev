import React from 'react';
import PropTypes from 'prop-types';

export default function Reactions({ onReact, isLiked, isLoved, isHaha, isWow, isSad, isAngry }) {
    const reactions = [
        { name: 'Like', icon: '/assets/images/react-like-filled.svg', isActive: isLiked ? "/assets/images/react-like-filled.svg" : "/assets/images/react-like.svg"},
        { name: 'Love', icon: '/assets/images/react-love.svg', isActive: isLoved ? "/assets/images/react-love.svg" : "" },
        { name: 'Haha', icon: '/assets/images/react-haha.svg', isActive: isHaha ? "/assets/images/react-haha.svg" : "" },
        { name: 'Wow', icon: '/assets/images/react-wow.svg', isActive: isWow ? "/assets/images/react-wow.svg" : "" },
        { name: 'Sad', icon: '/assets/images/react-sad.svg', isActive: isSad ? "/assets/images/react-sad.svg" : "" },
        { name: 'Angry', icon: '/assets/images/react-angry.svg', isActive: isAngry ? "/assets/images/react-angry.svg" : "" },
    ];

    return (
        <div className="flex space-x-2 bg-gray-400 p-1 mx-2 rounded-md shadow-lg">
            {reactions.map(reaction => (
                <img
                    key={reaction.name}
                    src={reaction.icon}
                    alt={reaction.name}
                    className={`w-8 h-8 cursor-pointer ${reaction.isActive ? 'scale-110' : ''}`}
                    onClick={() => onReact(reaction.name)}
                />
            ))}
        </div>
    );
};

Reactions.propTypes = {
    onReact: PropTypes.func.isRequired,
    isLiked: PropTypes.bool.isRequired,
    isLoved: PropTypes.bool.isRequired,
    isHaha: PropTypes.bool.isRequired,
    isWow: PropTypes.bool.isRequired,
    isSad: PropTypes.bool.isRequired,
    isAngry: PropTypes.bool.isRequired,
};