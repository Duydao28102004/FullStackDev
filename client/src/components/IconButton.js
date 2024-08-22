import React from "react";

export default function IconButton({ icon, text, onClick, className }) {
    return (
        <div className={`flex items-center cursor-pointer my-4 py-2 px-2 ${className}`} onClick={onClick}>
            {icon}
            <p className="mx-2 text-lg font-semibold">{text}</p>
        </div>
    );
}