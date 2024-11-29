import styles from './FollowStats.module.css';

function FollowStats({ following = 1, followers = 1 }) {
  return (
    <div className={styles.followStats}>
      <div className={styles.follow}>
        <span>{following}</span>
        <h5>Following</h5>
      </div>
      <div className={styles.follow}>
        <span>{followers}</span>
        <h5>{followers > 1 ? 'Followers' : 'Follower'}</h5>
      </div>
    </div>
  );
}

export default FollowStats;
