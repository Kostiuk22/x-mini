import FollowStats from '../ui/FollowStats/FollowStats';
import styles from './UserCard.module.css';

function UserCard({ onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={styles.userCard}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        {/* knopkaaa */}
      </div>

      <div className={styles.titleBlock}>
        <h3>Alex Bornyakov</h3>
        <h5>@tag</h5>
      </div>

      <div className={styles.description}>
        <p>
          The Deputy Minister of Digital Transformation of Ukraine on IT
          industry development, Head of the Diia City project
        </p>
      </div>

      <FollowStats />
    </div>
  );
}

export default UserCard;
