import { BiRepost } from 'react-icons/bi';
import styles from './IsReposted.module.css';

function IsReposted() {
  return (
    <div className={styles.isReposted}>
      <BiRepost className={styles.icon} />
      <h5>You reposted</h5>
    </div>
  );
}

export default IsReposted;
