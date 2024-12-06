import styles from './StatsProfile.module.css';

import { Link } from 'react-router-dom';

function StatsProfile({ following, followers }) {
  return (
    <div className={styles.stats}>
      <Link to={'stats/following'} className={styles.statsWrap}>
        <p>{following.length}</p>
        <h5>Following</h5>
      </Link>
      <Link to={'stats/followers'} className={styles.statsWrap}>
        <p>{followers.length}</p>
        <h5>{followers.length > 1 ? 'Followers' : 'Follower'}</h5>
      </Link>
    </div>
  );
}

export default StatsProfile;
