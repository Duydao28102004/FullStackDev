import React from 'react';
import PropTypes from 'prop-types';

export default function IconButton({ icon, text, onClick, className }) {
    return (
        <div className={`flex items-center cursor-pointer py-2 px-2 mx-2 ${className}`} onClick={onClick}>
            <img src={icon} alt={`${text} Icon`} className="h-6 w-6" />
            <p className='text-lg font-semibold px-2'>
                {text}
            </p>
        </div>
    );
};

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};
