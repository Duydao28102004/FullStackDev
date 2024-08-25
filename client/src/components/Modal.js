import React from 'react';

export default function Modal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-white py-4 px-8 rounded-lg shadow-lg h-1/5">
                {/* Text Notification */}
                <div>
                    <h2 className="text-lg font-bold text-center my-1">Confirm Logout</h2>
                    <p className="my-1">Are you sure you want to logout?</p>
                </div>
                {/* Buttons for Confirm and Cancel */}
                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
