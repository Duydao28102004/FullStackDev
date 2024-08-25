import React from "react";
import PropTypes from "prop-types";

const ReactionMenu = ({ onReact }) => {
    return (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex justify-between p-2">
            <img
                src="/assets/images/react-like.png"
                alt="Like"
                className="cursor-pointer w-8 h-8"
                onClick={() => onReact("like")}
            />
            <img
                src="/assets/images/react-haha.png"
                alt="Haha"
                className="cursor-pointer w-8 h-8"
                onClick={() => onReact("haha")}
            />
            <img
                src="/assets/images/react-angry.png"
                alt="Angry"
                className="cursor-pointer w-8 h-8"
                onClick={() => onReact("angry")}
            />
            <img
                src="/assets/images/react-sad.png"
                alt="Sad"
                className="cursor-pointer w-8 h-8"
                onClick={() => onReact("sad")}
            />
        </div>
    );
};

ReactionMenu.propTypes = {
    onReact: PropTypes.func.isRequired,
};

export default ReactionMenu;
