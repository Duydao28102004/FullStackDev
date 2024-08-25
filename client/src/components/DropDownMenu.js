import React from "react";

const DropdownMenu = () => {
    const onEdit = () => {
        console.log("Edit");
    };
    const onDelete = () => {
        console.log("Delete");
    }
    return (
        <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul>
                <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={onEdit}
                >
                    Edit
                </li>
                <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={onDelete}
                >
                    Delete
                </li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
