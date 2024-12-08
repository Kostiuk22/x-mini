import styles from './Followers.module.css';

import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';
import UserItem from '@components/RightSide/WhoToFollow/UserItem/UserItem';

import { useEffect, useState } from 'react';
import { UserRequests } from '@services/UserRequests';
import { useParams } from 'react-router-dom';

function Followers() {
  const [followersData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentUserTag = useParams().tag;

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      const data = await UserRequests.getFollowersByTag(currentUserTag);
      setFollowingData(data);

      setIsLoading(false);
    };
    fetchUser();
  }, [currentUserTag]);

  if (isLoading) return <LoadingSpinner />;
  if (!isLoading && followersData.length === 0)
    return (
      <h2 className={styles.infoText}>
        You don&apos;t have any followers yet.
      </h2>
    );

  return (
    <>
      {followersData?.map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}
    </>
  );
}

export default Followers;
