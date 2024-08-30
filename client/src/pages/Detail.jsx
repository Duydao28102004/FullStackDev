import React from 'react'
import WritePost from '../components/WritePost';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'
import LeftPanel from '../components/LeftPanel'
import Settings from '../components/Settings';

const Detail = () => {
  const user = {
    avatar: '/client/public/assets/images/test-avatar.jpg'
  };

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <div className="flex px-2 py-8 mx-12 mr-20">
        <LeftPanel />
        <div className="flex-grow ml-8">
          <WritePost user={user}/>
        </div>
      </div>
      <Settings/>
    </div>
  )
}

export default Detail