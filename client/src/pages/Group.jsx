import React from 'react'
import Navbar from '../components/Navbar'
import LeftGroupNav from '../components/LeftGroupNav'
import WritePost from '../components/WritePost'
import Settings from '../components/Settings'
import Post from '../components/Post'

const Group = () => {
  const dummyPosts = [
    {
        author: {
            avatar: '/client/public/assets/images/test-avatar.jpg',
            username: 'John Doe',
        },
        createdAt: '2024-08-30T12:34:56Z',
        content: 'This is the first dummy post content.',
        images: ['path_to_image_1.jpg', 'path_to_image_2.jpg'],
    },
    {
        author: {
            avatar: '/client/public/assets/images/test-avatar.jpg',
            username: 'Jane Smith',
        },
        createdAt: '2024-08-30T13:34:56Z',
        content: 'This is the second dummy post content.',
        images: [],
    }
];

  return (
    <div>
      <Navbar/>
      <div className="flex px-2 py-8 mx-12 mr-20">
        <section className="py-8 px-6">
          <div className="bg-[#DBE2EF] rounded-lg shadow-2xl py-2 ml-20 mr-20">
            <div className="flex justify-between items-center max-w-1xl mx-auto p-16 ">
              {/*User Info */}
              <div className="flex items-center space-x-4">
                {/* User Icon and Name */}
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
    
                  <div>
                    <span className="text-gray-700 font-medium text-lg block">User A</span>
                    <span className="text-sm text-gray-500 block">@UserA</span>
                  </div>
                </div>
    
                {/* Number of Friends */}
                <div className="ml-2">
                  <span className="text-gray-700 text-md font-small">300 Friends</span>
                </div>
              </div>
    
              {/* Edit Button */}
              <div>
                <button className="flex flex-row bg-[#3F72AF] hover:bg-blue-600 font-medium py-2 px-8 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  <span>Edit Personal Page</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <LeftGroupNav />
        <div className="flex-grow ml-8">
        <WritePost user={{ avatar: 'path_to_avatar_image.jpg', username: 'Current User' }} />
                    {dummyPosts.map((post, index) => (
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
        </div>
      </div>
      <Settings/>
    </div>
  )
}

export default Group