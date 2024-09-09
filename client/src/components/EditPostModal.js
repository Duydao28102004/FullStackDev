import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

export default function EditPostModal({ postId, content, images, onClose }) {
    const [newContent, setNewContent] = useState(content);
    const [newImages, setNewImages] = useState(images.slice(0, 5)); // Limit the images to 5

    const handleContentChange = (e) => {
        setNewContent(e.target.value);
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const fileReaders = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file); // Read file as base64
            });
        });
    
        Promise.all(fileReaders)
            .then(base64Images => setNewImages(base64Images.slice(0, 5))) // Limit to 5 images
            .catch(error => console.error('Error reading files:', error));
    };

    const handleSave = async () => {
        try {
            console.log(newImages)
            // Send the updated content and images to the server
            await axios.put(`http://localhost:3001/api/posts/updatePost/${postId}`, {
                content: newContent,
                images: newImages
            });
    
            // Reload the page to reflect the updates
            window.location.reload();  // This will reload the current page
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-md w-[90%] max-w-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Post</h2>

                <textarea
                    className="w-full p-2 mb-4 border rounded-md"
                    value={newContent}
                    onChange={handleContentChange}
                    rows={4}
                />

                <div className="mb-4">
                    <label className="block mb-2">Update Images (max 5):</label>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImagesChange} 
                        className="mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        {newImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                            />
                        ))}
                    </div>
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
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

EditPostModal.propTypes = {
    postId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};
