import React, {useEffect, useState} from 'react';
import CheckAuth from '../CheckAuth';
import LeftSideNav from '../components/LeftSideNav';
import RightSideNav from '../components/RightSideNav';
import Post from '../components/Post';
import { useSession } from '../LoginData';
import axios from 'axios';
import WritePost from '../components/WritePost';

const Home = () => {
    const [selectedContent, setSelectedContent] = useState('Home');
    const checkAuth = CheckAuth();
    const { userData } = useSession();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/getUSer?userid=${userData.userid}`);
                setUser(response.data);
                const responsePosts = await axios.get('http://localhost:3001/api/posts/getPosts');
                setPosts(responsePosts.data);
                console.log(responsePosts.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        checkAuth();
        if (userData.userid) {
            fetchUser(); // Fetch user data if userid is available
        }
    }, [checkAuth, userData.userid]);

    const renderMainContent = () => {
        if (!user) {
            return <div>Loading...</div>; // Loading state
        }

        switch (selectedContent) {
            case 'Home':
                return (
                    <>
                        <WritePost user={user} />
                        {posts.map((post) => (
                            <Post 
                            avatar={post.author.avatar}
                            name={post.author.username}
                            publishedDate={post.createdAt}
                            content={post.content}
                            images={post.images}
                            postId={post._id}
                            onComment={() => {console.log('Comment')}}
                        />
                        ))}
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
        <div className='flex w-full h-screen pl-4'>
            {/* Left-side Navigation */}
            <div className='sticky top-0 h-screen'>
                <LeftSideNav onSelectContent={setSelectedContent} user={user || { avatar: '', username: '' }} /> 
            </div>

            {/* Main Content */}
            <div className='flex flex-col h-full py-4 px-0 w-[80%] mx-auto overflow-y-auto'>
                {renderMainContent()}
            </div>

            {/* Right-side Navigation */}
            <div className='sticky top-0 h-screen pr-4 pl-4 '>
                <RightSideNav /> 
            </div>

        </div>
    );
};

export default Home;
