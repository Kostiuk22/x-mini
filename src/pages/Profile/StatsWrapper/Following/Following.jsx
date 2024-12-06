import styles from './Following.module.css';

import LoadingSpinner from '../../../../components/ui/LoadingSpinner/LoadingSpinner';
import UserItem from '../../../../components/RightSide/WhoToFollow/UserItem/UserItem';

import { useEffect, useState } from 'react';
import { UserRequests } from '../../../../services/UserRequests';
import { useParams } from 'react-router-dom';

function Following() {
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentUserTag = useParams().tag;

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      const data = await UserRequests.getFollowingByTag(currentUserTag);
      setFollowingData(data);

      setIsLoading(false);
    };
    fetchUser();
  }, [currentUserTag]);

  if (isLoading) return <LoadingSpinner />;
  if (!isLoading && followingData.length === 0)
    return (
      <h2 className={styles.infoText}>You are not signed to anyone yet.</h2>
    );

  return (
    <>
      {followingData?.map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}
    </>
  );
}

export default Following;
