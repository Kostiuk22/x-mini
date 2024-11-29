import styles from './StatsProfile.module.css';

function StatsProfile({following, followers}) {
  return (
    <div className={styles.stats}>
      <div className={styles.statsWrap}>
        <p>{following.length}</p>
        <h5>Following</h5>
      </div>
      <div className={styles.statsWrap}>
        <p>{followers.length}</p>
        <h5>{followers.length > 1 ? 'Followers' : 'Follower'}</h5>
      </div>
    </div>
  );
}

export default StatsProfile;
