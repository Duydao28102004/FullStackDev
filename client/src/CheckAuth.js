import { useSession } from './LoginData';
import { useNavigate } from 'react-router-dom';

export const CheckAuth = () => {
  const { userData, authenticated } = useSession();
  const navigate = useNavigate();

  const checkAuth = () => {
    if (authenticated === false) {
      navigate('/login');
    }
    if (userData.username === 'admin') {
      navigate('/admin');
    }
  };

  return checkAuth;
};

export default CheckAuth;