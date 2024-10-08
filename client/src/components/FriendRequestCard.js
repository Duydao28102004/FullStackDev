import React from 'react';
import { useSession } from '../LoginData';
import axios from 'axios';

export default function FriendRequestCard({ senderid, username, avatar, onRequestHandled }) {
    const { userData } = useSession();

    const handleAccept = async () => {
        try {
            await axios.post('http://localhost:3001/api/friendsRequest/acceptRequest', {
                senderid: senderid,
                receiverid: userData.userid
            });
            onRequestHandled(senderid); // Remove the request from the UI
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.post('http://localhost:3001/api/friendsRequest/rejectRequest', {
                senderid: senderid,
                receiverid: userData.userid
            });
            onRequestHandled(senderid); // Remove the request from the UI
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    return (
        <div className='flex flex-col border border-1 rounded-lg mr-8'>
            <div className='flex flex-col'>
                <img 
                    src={avatar} 
                    alt={avatar} 
                    className='w-56 h-64 object-cover rounded-t-lg'
                />
            </div>
            <div className='flex flex-col p-2'>
                <h1 className='font-bold'>
                    {username}
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
