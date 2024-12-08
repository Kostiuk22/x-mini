import styles from './MainLayout.module.css';

import LeftSide from '@components/LeftSide/LeftSide';
import Main from '@components/Main/Main';
import RightSide from '@components/RightSide/RightSide';
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function MainLayout() {
  const curLocation = useLocation().pathname;
  const navigate = useNavigate();
  const isLoadingUserState = useSelector((state) => state.user.isLoading);
  const isMessagesDfltRoute = curLocation.split('/').includes('messages');
  const isSettingsDfltRoute = curLocation.split('/').includes('settings');

  useEffect(() => {
    if (curLocation === '/x.com') {
      navigate('/x.com/home');
    }
  }, [curLocation, navigate]);

  if (isLoadingUserState) return <LoadingSpinner />;

  return (
    <div className={styles.mainLayout}>
      <LeftSide />
      <Main>
        <div className="container">
          <Outlet />
        </div>
        {!isMessagesDfltRoute && !isSettingsDfltRoute && <RightSide />}
      </Main>
    </div>
  );
}

export default MainLayout;
