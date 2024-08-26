import React, {useEffect, useState} from 'react';
import CheckAuth from '../CheckAuth';
import LeftSideNav from '../components/LeftSideNav';
import RightSideNav from '../components/RightSideNav';
import Post from '../components/Post';
import { useSession } from '../LoginData';
import axios from 'axios';

const Home = () => {
    const [selectedContent, setSelectedContent] = useState('Home');
    const checkAuth = CheckAuth();
    const { userData } = useSession();
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/getAvatar?username=${userData.username}`);
                setUserAvatar(response.data.avatar); // Set the avatar string
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        };

        checkAuth();
        if (userData.username) {
            fetchAvatar(); // Fetch avatar if username is available
        }
    }, [checkAuth, userData.username]);

    const renderMainContent = () => {
        switch (selectedContent) {
            case 'Home':
                return (
                    <>
                    <img src={userAvatar} alt="Base64 Image" style={{ width: '100%', height: 'auto' }} />
                    <p>{userData.username}</p>
                    <Post 
                        avatar='/assets/images/test-avatar.jpg'
                        name='John Doe'
                        publishedDate='2021-09-15 12:00:00'
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                        onComment={() => {console.log('Comment')}}
                    />
                    </>
                );
            case 'Friends':
                return "Friends";
            case 'User Profile':
                return "User Profile";
            default:
                return <div>Select an option from the left navigation</div>;
        }
    };
    
    return (
        <div className='flex w-full h-screen'>
            {/* Left-side Navigation */}
            <LeftSideNav onSelectContent={setSelectedContent}/>

            {/* Main Content */}
            <div className='flex flex-col h-full py-4 px-8 w-[60%]'>
                {renderMainContent()}
            </div>

            {/* Right-side Navigation */}
            <RightSideNav />

        </div>
    );
};

export default Home;