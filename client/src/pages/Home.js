import React, {useEffect, useState} from 'react';
// import { useSession } from '../LoginData';
import CheckAuth from '../CheckAuth';
import LeftSideNav from '../components/LeftSideNav';
import RightSideNav from '../components/RightSideNav';
import Post from '../components/Post';

const Home = () => {
    // const { userData, deleteUserData } = useSession();
    const [selectedContent, setSelectedContent] = useState('Home');

    const renderMainContent = () => {
        switch (selectedContent) {
            case 'Home':
                return (
                    <Post 
                        avatar='/assets/images/test-avatar.jpg'
                        name='John Doe'
                        publishedDate='2021-09-15 12:00:00'
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                        onComment={() => {console.log('Comment')}}
                    />
                );
            case 'Friends':
                return "Friends";
            case 'User Profile':
                return "User Profile";
            default:
                return <div>Select an option from the left navigation</div>;
        }
    };

    // const checkAuth = CheckAuth();
    // useEffect(() => {
    //   checkAuth();
    // }, [checkAuth]);
    
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