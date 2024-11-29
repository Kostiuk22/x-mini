import { useEffect, useState } from 'react';
import ShowMoreBtn from '../../ui/ShowMoreBtn/ShowMoreBtn';
import UserItem from './UserItem/UserItem';
import styles from './WhoToFollow.module.css';
import { UserRequests } from '../../../services/UserRequests';
import { useUserProfile } from '../../../hooks/useUserProfile';

function WhoToFollow() {
  const currentUserId = useUserProfile().uid;
  const [offerUsers, setOfferUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersLimit, setUsersLimit] = useState(3);

  useEffect(() => {
    if (!currentUserId) return;
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await UserRequests.getUsers(currentUserId, usersLimit);
      setOfferUsers(data);
      setIsLoading(false);
    };
    fetchUser();
  }, [currentUserId, usersLimit]);

  return (
    <div className={`${styles.whoToFollow} box`}>
      <h2>Who to follow</h2>
      {!isLoading &&
        offerUsers.length > 0 &&
        offerUsers.map((user) => <UserItem key={user.uid} user={user} />)}
      {offerUsers && offerUsers.length >= usersLimit && (
        <ShowMoreBtn onClick={() => setUsersLimit((prev) => prev + 3)} />
      )}
    </div>
  );
}

export default WhoToFollow;
