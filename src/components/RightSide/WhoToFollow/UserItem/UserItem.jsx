import styles from './UserItem.module.css';

import FollowBtn from '../../../ui/FollowBtn/FollowBtn';
import Avatar from '../../../ui/Avatar/Avatar';
import NickName from '../../../ui/NickName/NickName';

import { useUserProfile } from '../../../../hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';

function UserItem({ user }) {
  const { tag, name, uid, photoURL } = user;

  const navigate = useNavigate();
  const currentUserId = useUserProfile().uid;
  
  return (
    <div className={styles.userItem} onClick={() => navigate(`/x.com/${tag}`)}>
      <Avatar photoURL={photoURL} />
      <div className={styles.content}>
        <div className={styles.info}>
          <NickName userName={name} tag={tag} />
          <h5>@{tag}</h5>
        </div>

        {user.uid !== currentUserId ? (
          <FollowBtn currentUserId={currentUserId} targetUserId={uid} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default UserItem;
