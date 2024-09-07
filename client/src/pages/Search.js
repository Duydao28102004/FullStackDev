import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { Link, useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    groups: []
  });
  
  useEffect(() => {
    const query = searchParams.get('query');
    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/search?query=${query}`);
            console.log(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    if (query) {
      setSearchTerm(query);
      fetchSearchResults();
    }
  }, [searchParams]);
  

  return (
    <>
      <Navbar searchQuery={searchTerm} setSearchQuery={setSearchTerm} />
      <div className="flex flex-col w-full p-4 items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results for "{searchTerm}"</h1>

        {/* Users Section */}
        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Users</h2>
          <div className="grid grid-cols-1 gap-6">
            {searchResults.users?.length > 0 ? (
              searchResults.users.map(user => (
                <Link key={user._id} to={`/user/${user._id}`}>
                    <div key={user._id} className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
                        <img 
                            src={user.avatar} 
                            alt={user.username}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-800">{user.username}</p>
                    </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No users found</p>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Posts</h2>
          <div className="space-y-4">
            {searchResults.posts?.length > 0 ? (
              searchResults.posts.map(post => (
                <>
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
                </>
              ))
            ) : (
              <p className="text-gray-500">No posts found</p>
            )}
          </div>
        </div>

        {/* Groups Section */}
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Groups</h2>
          <div className="space-y-4">
            {searchResults.groups?.length > 0 ? (
              searchResults.groups.map(group => (
                <div key={group._id} className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
                  <p className="text-gray-700">{group.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No groups found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
