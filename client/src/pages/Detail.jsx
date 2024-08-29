import React, { useEffect, useState } from 'react'
import WritePost from '../components/WritePost';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'
import LeftPanel from '../components/LeftPanel'
import Settings from '../components/Settings';
import { useSession } from '../LoginData';
import axios from 'axios';

const Detail = () => {
  const { userData } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getUSer?userid=${userData.userid}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userData.userid) {
      fetchUser();
    }
  }, [userData.userid]);

  if (!user) {
    return <div>Loading...</div>;
  }

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