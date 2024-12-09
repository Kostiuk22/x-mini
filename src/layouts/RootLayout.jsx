import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useSelector } from 'react-redux';

function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useAuth();

  if (location.pathname === '/' && !isAuthenticated) {
    return navigate('/auth');
  } else if (location.pathname === '/' && isAuthenticated) {
    return navigate('/home');
  }

  return <Outlet />;
}

export default RootLayout;
