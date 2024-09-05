import React from 'react';

export default function FriendRequestCard({ profileName, profileImage }) {

    const handleAccept = () => {
        console.log('Accepting friend request');
    }

    const handleReject = () => {
        console.log('Rejecting friend request');
    }

    return (
        <div className='flex flex-col border border-1 rounded-lg mr-8'>
            <div className='flex flex-col'>
                <img 
                    src={profileImage} 
                    alt={profileName} 
                    className='w-56 h-64 object-cover rounded-t-lg'
                />
            </div>
            <div className='flex flex-col p-2'>
                <h1 className='font-bold'>
                    {profileName}
                </h1>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 my-1 rounded-lg' onClick={handleAccept}>
                    Accept
                </button>
                <button className='bg-gray-300 hover:bg-gray-400 text-white font-semibold py-1 px-4 my-1 rounded-lg' onClick={handleReject}>
                    Reject
                </button>
            </div>
        </div>
    )
}