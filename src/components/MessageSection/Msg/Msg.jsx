import styles from './Msg.module.css';

import { useUserProfile } from '../../../hooks/useUserProfile';
import { transformDateForPostInfo } from '../../../utils/transformDateForPostInfo';

function Msg({ message }) {
  const { text, senderId, createdAt } = message;
  const userId = useUserProfile().uid;

  const isCurrentUser = senderId === userId;

  return (
    <div className={styles.msg}>
      <div
        className={`${styles.message} ${
          isCurrentUser ? styles.currentUser : ''
        }`}
      >
        <span>{text}</span>
      </div>
      <div
        className={`${styles.timestamp} ${
          isCurrentUser ? styles.timestampCurrent : ''
        }`}
      >
        {transformDateForPostInfo(createdAt)}
      </div>
    </div>
  );
}

export default Msg;
