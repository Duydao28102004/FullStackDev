import { useSession } from './LoginData';
import { useNavigate } from 'react-router-dom';

export const CheckAuth = () => {
  const { authenticated } = useSession();
  const navigate = useNavigate();

  const checkAuth = () => {
    if (authenticated === false) {
      // navigate('/login');

      // Need to work on the Home Page so temporary redirect to the root 
      navigate('/')
    }
  };

  return checkAuth;
};

export default CheckAuth;