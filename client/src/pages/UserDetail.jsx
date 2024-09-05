import React, { useState, useEffect } from 'react';
import WritePost from '../components/WritePost';
import Navbar from '../components/Navbar';
import LeftPanel from '../components/LeftPanel';
import Settings from '../components/Settings';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSession } from '../LoginData';

const UserDetail = () => {
  const { userid } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [friend, setFriend] = useState(false);
  const { userData } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      if (userData && userData.userid) {
        try {
          console.log(userData);
          const response = await axios.get(`http://localhost:3001/api/getUser?userid=${userid}`);
          setUser(response.data);
          const responsePosts = await axios.get('http://localhost:3001/api/posts/getPosts');
          setPosts(responsePosts.data);
          const checkFriend = await axios.get(`http://localhost:3001/api/friendsRequest/checkRequest?senderid=${userData.userid}&receiverid=${userid}`);
          if (checkFriend.data.friend) {
            setFriend(true);
          }
          if (checkFriend.data.requestSent) {
            setRequestSent(true);
          }
          if (checkFriend.data.reverse) {
            setReverse(true);
          }
          console.log(checkFriend.data);
        } catch (error) {
          console.error('Error fetching user or posts:', error);
        }
      }
    };

    fetchUser();
  }, [userid, userData]);

  // Filter posts authored by the current user
  const userPosts = posts.filter(post => post.author._id === userid);

  const handleAddFriend = async () => {
    console.log('add friend');
    console.log(userData.userid, userid);
    const response = await axios.post('http://localhost:3001/api/friendsRequest/sendRequest', {
      senderid: userData.userid,
      receiverid: userid
    });
    console.log(response.data);
    setRequestSent(true);
  };

  return (
    <div>
      <Navbar />
      <section className="py-8 px-6">
        <div className="bg-[#DBE2EF] rounded-lg shadow-2xl py-2 ml-20 mr-20">
          <div className="flex justify-between items-center max-w-1xl mx-auto p-16 ">
            {/* User Info */}
            <div className="flex items-center space-x-4">
              {/* User Icon and Name */}
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <span className="text-gray-700 font-medium text-lg block">{user.username}</span>
                  <span className="text-sm text-gray-500 block">300 Friends</span>
                </div>
              </div>
            </div>

            {/* Edit Button - only show if userData.userid matches userid */}
            {userData.userid === userid && (
              <div>
                <button className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  <span>Edit Personal Page</span>
                </button>
              </div>
            )}
            {userData.userid !== userid && (
              friend ? (
                <div>
                  <button className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <span>Friend</span>
                  </button>
                </div>
              ) : requestSent ? (
                <div>
                  <button className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <span>Request sent</span>
                  </button>
                </div>
              ) : reverse ? (
                <div>
                  <button className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <span>Accept friend</span>
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={handleAddFriend} className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <span>send request</span>
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <div className="flex px-2 py-8 mx-12 mr-20">
        <LeftPanel />
        <div className="flex-grow ml-8">
          {/* Write Post - only show if userData.userid matches userid */}
          {userData.userid === userid && <WritePost user={user} />}
          
          {/* Display User Posts */}
          {userPosts.map((post, index) => (
            <Post
              key={index}  // Add a key prop to avoid console warnings
              avatar={post.author.avatar}
              name={post.author.username}
              publishedDate={post.createdAt}
              content={post.content}
              images={post.images}
              postId={post._id}
              userId={post.author._id}
            />
          ))}
        </div>
      </div>
      <Settings />
    </div>
  );
}

export default UserDetail;
