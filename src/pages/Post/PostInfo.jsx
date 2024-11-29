import styles from './PostInfo.module.css';
import { transformDateForPostInfo } from '../../utils/transformDateForPostInfo';

function PostInfo({ postInfo  }) {
  const { createdAt, numberOfViews } = postInfo;
  const formattedDate = transformDateForPostInfo(createdAt);
  return (
    <div className={styles.info}>
      <div className={styles.date}>{formattedDate}</div>
      <h5>·</h5>
      <div className={styles.views}>
        <span>{numberOfViews}</span> Views
      </div>
    </div>
  );
}

export default PostInfo;
