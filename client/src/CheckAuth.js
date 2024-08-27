import { useSession } from './LoginData';
import { useNavigate } from 'react-router-dom';

export const CheckAuth = () => {
  const { authenticated } = useSession();
  const navigate = useNavigate();

  const checkAuth = () => {
    if (authenticated === false) {
      navigate('/login');
    }
  };

  return checkAuth;
};

export default CheckAuth;