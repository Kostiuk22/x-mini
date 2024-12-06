import styles from './StatsWrapper.module.css';

import HeaderProfile from '../../../components/ProfileComponents/HeaderProfile/HeaderProfile';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';

import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserRequests } from '../../../services/UserRequests';

function StatsWrapper() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const currentUserTag = useParams().tag;

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await UserRequests.getUserByTag(currentUserTag);
      setUser(data);
      setIsLoading(false);
    };
    fetchUser();
  }, [currentUserTag]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles.wrapper}>
      <HeaderProfile name={user.name} tag={user.tag} />
      <nav className={styles.nav}>
        <NavLink
          to={'followers'}
          className={({ isActive }) => (isActive ? `${styles.active}` : '')}
        >
          Followers
        </NavLink>
        <NavLink
          to={'following'}
          className={({ isActive }) => (isActive ? `${styles.active}` : '')}
        >
          Following
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default StatsWrapper;
