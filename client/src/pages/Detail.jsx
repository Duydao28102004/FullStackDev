import React from 'react'
import WritePost from '../components/WritePost';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'
import LeftPanel from '../components/LeftPanel'
import Settings from '../components/Settings';
import Post from '../components/Post'

const Detail = () => {
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
      <HeroSection/>
      <div className="flex px-2 py-8 mx-12 mr-20">
        <LeftPanel />
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
                            onComment={() => { console.log('Comment') }}
                        />
                    ))}
        </div>
      </div>
      <Settings/>
    </div>
  )
}

export default Detail