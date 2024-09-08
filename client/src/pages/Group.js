import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Post from '../components/Post'; // Import if you want to show posts
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSession } from '../LoginData'; // Import if needed
import WritePost from '../components/WritePost'; // Import if you want to show posts

const Group = () => {
  const { groupid } = useParams();
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [member, setMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin check
  const [showRequestButton, setShowRequestButton] = useState(false); // Toggle for admin
  const [GroupRequests, setGroupRequests] = useState([]); // New state for group request
  const [user, setUser] = useState({});
  const { userData } = useSession();

  useEffect(() => {
    const fetchGroupAndPosts = async () => {
      if (userData && userData.userid) {
        try {
          const postsPromise = axios.get(`http://localhost:3001/api/groups/getPosts?groupid=${groupid}`);
          const userPromise = axios.get(`http://localhost:3001/api/getUser?userid=${userData.userid}`);
          const groupPromise = axios.get(`http://localhost:3001/api/groups/getGroup?groupid=${groupid}`);
          const memberPromise = axios.get(`http://localhost:3001/api/groups/getGroupRequest?userid=${userData.userid}&groupid=${groupid}`);
          const [postsResponse, userResponse, groupResponse, memberRespone] = await Promise.all([postsPromise, userPromise, groupPromise, memberPromise]);

          setPosts(postsResponse.data);
          setUser(userResponse.data);

          if (groupResponse.data.members.includes(userData.userid)) {
            setMember(true);
          }

          if (groupResponse.data.admins.includes(userData.userid)) {
            setIsAdmin(true);
            setShowRequestButton(true);
            const groupRequests = await axios.get(`http://localhost:3001/api/groups/getAllGroupRequests?groupid=${groupid}`);
            setGroupRequests(groupRequests.data);
          }

          setGroup(groupResponse.data);

          if (memberRespone.data.member) {
            setMember(true);
          }
          if (memberRespone.data.requestSent) {
            setRequestSent(true);
          }

        } catch (error) {
          console.error('Error fetching group or posts:', error);
        }
      }
    };

    fetchGroupAndPosts();
  }, [groupid, userData, requestSent]);

  const handleJoinGroup = async () => {
    const response = await axios.post('http://localhost:3001/api/groups/joinGroupRequest', {
      userid: userData.userid,
      groupid
    });
    setRequestSent(true);
  };

  const handleLeaveGroup = async () => {
    const response = await axios.post('http://localhost:3001/api/groups/leaveGroup', {
      userid: userData.userid,
      groupid
    });
    setMember(false);
  };

  const handleCancelRequest = async () => {
    const response = await axios.post('http://localhost:3001/api/groups/rejectGroupRequest', {
      userid: userData.userid,
      groupid
    });
    setRequestSent(false);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:3001/api/groups/acceptGroupRequest`, {  
        senderid: requestId, 
        groupid 
      });
      setGroupRequests(GroupRequests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:3001/api/groups/rejectGroupRequest`, { 
        senderid: requestId, 
        groupid 
      });
      setGroupRequests(GroupRequests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const toggleButton = () => {
    setShowRequestButton(!showRequestButton);
  };

  return (
    <>
      <Navbar />
      <div>
        <section className="py-8 px-6">
          <div className="bg-[#DBE2EF] rounded-lg shadow-2xl py-2 ml-20 mr-20">
            <div className="flex justify-between items-center max-w-1xl mx-auto p-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div>
                    <span className="text-gray-700 font-medium text-lg block">{group.name}</span>
                    <span className="text-sm text-gray-500 block">{group.members ? group.members.length : 0} members</span>
                  </div>
                </div>
              </div>
              {!isAdmin && (
                member ? (
                  <div>
                    <button onClick={handleLeaveGroup} className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                      <span>Leave Group</span>
                    </button>
                  </div>
                ) : requestSent ? (
                  <div>
                    <button onClick={handleCancelRequest} className="flex flex-row bg-gray-500 hover:bg-gray-600 font-medium py-2 px-4 rounded-lg text-white">
                      <span>Cancel Request</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleJoinGroup} className="flex flex-row bg-blue-500 hover:bg-blue-600 font-medium py-2 px-4 rounded-lg text-white">
                      <span>Join Group</span>
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
        <div className="flex px-2 py-8 mx-12 mr-20">
          <section className="py-2 px-4 ml-16 mr-8 w-[25%]">
            <div className="w-[90%] rounded-lg shadow-lg">
              {member && (
                <div className="mb-6 p-4 bg-[#DBE2EF] rounded-lg shadow">
                  <button className="w-full bg-[#3F72AF] py-2 rounded mb-2">Post</button>
                </div>
              )}
              {isAdmin && (
                <div className="mb-6 p-4 bg-[#DBE2EF] rounded-lg shadow">
                  {showRequestButton ? (
                    <button onClick={toggleButton} className="w-full bg-[#3F72AF] py-2 rounded">Request</button>
                  ) : (
                    <button onClick={toggleButton} className="w-full bg-[#3F72AF] py-2 rounded">Post</button>
                  )}
                </div>
              )}
            </div>
          </section>
          <div className="flex-grow ml-8">
            {showRequestButton ? (
              <div>
                <h2>Group Requests</h2>
                {GroupRequests.map(request => (
                  <div key={request._id} className="mb-4 p-4 bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p>{request.sender.username}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button onClick={() => handleAcceptRequest(request.sender._id)} className="bg-green-500 text-white py-2 px-4 rounded">Accept</button>
                        <button onClick={() => handleRejectRequest(request.sender._id)} className="bg-red-500 text-white py-2 px-4 rounded">Reject</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
              <WritePost user={user} groupid={groupid} />
              {posts.map((post, index) => (    
                  <Post
                    key={index}
                    avatar={post.author.avatar}
                    name={post.author.username}
                    publishedDate={post.createdAt}
                    content={post.content}
                    images={post.images}
                    postId={post._id}
                    userId={post.author._id}
                  />
              ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Group;
