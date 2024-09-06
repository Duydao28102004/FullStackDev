import React, { useEffect, useState } from 'react';
import CheckAuth from '../CheckAuth';
import LeftSideNav from '../components/LeftSideNav';
import Post from '../components/Post';
import { useSession } from '../LoginData';
import axios from 'axios';
import WritePost from '../components/WritePost';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedContent, setSelectedContent] = useState('Home');
    const checkAuth = CheckAuth();
    const { userData } = useSession();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/getUser?userid=${userData.userid}`);
                setUser(response.data);

                const responsePosts = await axios.get('http://localhost:3001/api/posts/getPosts');
                setPosts(responsePosts.data);
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
    
        // Get friend IDs for easier comparison
        const friendIds = user.friends.map((friend) => friend._id);
    
        switch (selectedContent) {
            case 'Home':
                // Filter posts: show either public posts or posts from friends
                const filteredPosts = posts
                .filter(
                    post => post.visibility === 'public' || friendIds.includes(post.author._id)
                )
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first
                ;
                
                return (
                    <>
                        <WritePost user={user} />
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <Post 
                                    key={post._id} // Ensure each post has a unique key
                                    avatar={post.author.avatar}
                                    name={post.author.username}
                                    publishedDate={post.createdAt}
                                    content={post.content}
                                    images={post.images}
                                    postId={post._id}
                                    userId={post.author._id}
                                />
                            ))
                        ) : (
                            <p>No posts to display.</p>
                        )}
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
            <div className='sticky top-0 h-screen w-[20%]'>
                <LeftSideNav onSelectContent={setSelectedContent} user={user || { avatar: '', username: '' }} /> 
            </div>

            {/* Main Content */}
            <div className='flex flex-col h-full py-4 px-0 w-[80%] mx-auto overflow-y-auto'>
                {renderMainContent()}
            </div>

            {/* Right-side Navigation (Friends List) */}
            <div className='sticky top-0 h-screen pr-4 pl-4 w-[20%]'>
                <div className="flex flex-col w-full h-screen bg-gray-200 py-4 overflow-y-auto">
                    <div className="flex justify-between mx-2">
                        <h1 className="font-bold text-lg text-center px-2 py-2">
                            Friends List
                        </h1>
                    </div>
                    <div>
                        {user && user.friends && user.friends.length > 0 ? (
                            user.friends.map((friend) => (
                                <Link to={`/user/${friend._id}`} key={friend._id}> {/* Use Link to navigate */}
                                    <div 
                                        className="flex items-center justify-start py-2 px-2 mx-2 cursor-pointer hover:bg-gray-300 hover:rounded-lg"
                                    >
                                        <div className="h-12 w-12">
                                            <img 
                                                src={friend.avatar || '/default-avatar.png'}  // Fallback to default avatar
                                                alt={friend.username}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-base font-semibold px-2">
                                                {friend.username}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No friends found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
