import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSession } from "../LoginData";

export default function CreateGroupModal({ onClose, onGroupCreated }) {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('public'); // default visibility to 'public'
    const { userData } = useSession();
    
    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleVisibilityChange = (e) => {
        setVisibility(e.target.value);
    };

    const handleCreateGroup = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/groups/createGroup', {
                name: groupName,
                description,
                visibility,
                admin: userData.userid,
            });

            // Notify the parent component about the newly created group
            onGroupCreated(response.data);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-md w-[90%] max-w-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Create Group</h2>

                <div className="mb-4">
                    <label className="block mb-2">Group Name:</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={handleGroupNameChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Description:</label>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full p-2 border rounded-md"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Visibility:</label>
                    <select
                        value={visibility}
                        onChange={handleVisibilityChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleCreateGroup}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

CreateGroupModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onGroupCreated: PropTypes.func.isRequired,
};
