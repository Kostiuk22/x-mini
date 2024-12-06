import styles from './FollowCard.module.css';

import MoreBtn from '../ui/MoreBtn/MoreBtn';
import NickName from '../ui/NickName/NickName';
import FollowBtn from '../ui/FollowBtn/FollowBtn';

function FollowCard({ status = 'Follow' }) {
  return (
    <div className={styles.block}>
      <div className={styles.avatar}>
        <div className={styles.img}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <div>
            <NickName userName="Misha" />
            <h5>@beyrfuefe</h5>
          </div>
          <div className={styles.btnBlock}>
            <FollowBtn status={status} />
            {status === 'Follow' && <MoreBtn />}
          </div>
        </div>
        <div className={styles.description}>
          <h3>Learning is never done without error, and defeat.</h3>
        </div>
      </div>
    </div>
  );
}

export default FollowCard;
