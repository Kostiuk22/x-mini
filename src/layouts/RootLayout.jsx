import { Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

function RootLayout() {
  useAuth();
  return <Outlet />;
}

export default RootLayout;
