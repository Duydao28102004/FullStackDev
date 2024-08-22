import React, {useEffect} from 'react';
import { useSession } from '../LoginData';
import CheckAuth from '../CheckAuth';
import SideNav from '../components/SideNav';

const Home = () => {
    const { userData, deleteUserData } = useSession();

    const checkAuth = CheckAuth();
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
    
    return (
        // <div>
        //     <h1 className='text-red-500'>Home</h1>
        //     <p>{userData.username}</p>
        //     <button onClick={deleteUserData}>Logout</button>

        // </div>

        // Implemeting the Home Page
        <div className='flex w-screen'>
            <SideNav />
            
        </div>
    );
};

export default Home;