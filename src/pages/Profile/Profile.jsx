import styles from './Profile.module.css';

import NavBar from './Navbar/NavBar';
import defaultUserImg from '@assets/defaultUser.png';
import HeaderProfile from '@components/ProfileComponents/HeaderProfile/HeaderProfile';
import StatsProfile from '@components/ProfileComponents/StatsProfile/StatsProfile';
import ProfileEditBlock from '@components/ProfileComponents/ProfileEditBlock/ProfileEditBlock';
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';
import FollowBtn from '@components/ui/FollowBtn/FollowBtn';

import { FaRegCalendarAlt } from 'react-icons/fa';
import { Outlet, useParams } from 'react-router-dom';
import { useUserProfile } from '@hooks/useUserProfile';
import { transformDate } from '@utils/transformDate';
import { UserRequests } from '@services/UserRequests';
import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const authUser = useUserProfile();
  const currentUserTag = useParams().tag;
  const isAuthedUser = authUser.tag === currentUserTag;

  useEffect(() => {
    if (!isAuthedUser) {
      const fetchUser = async () => {
        setIsLoading(true);
        const data = await UserRequests.getUserByTag(currentUserTag);
        setUser(data);
        setIsLoading(false);
      };
      fetchUser();
    } else {
      setUser(authUser);
    }
  }, [authUser, isAuthedUser, currentUserTag ]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div className={styles.profile}>User not found</div>;
  }

  const dateJoining = transformDate(user.dateOfJoining);

  return (
    <div className={styles.profile}>
      <HeaderProfile name={user.name} />

      <main className={styles.main}>
        <div className={styles.backImg}></div>
        <div className={styles.mainContent}>
          <div className={styles.bigImg}>
            {user.photoURL && <img src={user.photoURL} alt="Avatar" />}
            {!user.photoURL && <img src={defaultUserImg} alt="Avatar" />}
          </div>
          <div className={styles.editBlock}>
            {isAuthedUser ? (
              <ProfileEditBlock />
            ) : (
              <FollowBtn currentUserId={authUser.uid} targetUserId={user.uid} />
            )}
          </div>

          <div className={styles.mainTitle}>
            <h2>{user.name}</h2>
            <h5>@{user.tag}</h5>
          </div>

          {user.bio && <div className={styles.bio}>{user.bio}</div>}

          <div className={styles.additionalInfo}>
            {user.location && (
              <div className={styles.additionalInfoItem}>
                <FaLocationDot fill="grey" size={14} />
                <h5>{user.location}</h5>
              </div>
            )}
            <div className={styles.additionalInfoItem}>
              <FaRegCalendarAlt fill="grey" size={14} />
              <h5>Joined {dateJoining}</h5>
            </div>
          </div>

          <StatsProfile followers={user.followers} following={user.following} />
        </div>
      </main>
      <NavBar isAuthedUser={isAuthedUser} tag={user.tag} />

      <Outlet />
    </div>
  );
}

export default Profile;
