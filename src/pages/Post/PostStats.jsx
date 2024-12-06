import styles from './PostStats.module.css';

//import { BiRepost } from 'react-icons/bi';
import { IoChatboxOutline } from 'react-icons/io5';
import { FaBookmark, FaHeart, FaRegCopy, FaRegHeart } from 'react-icons/fa';
import { useUserProfile } from '../../hooks/useUserProfile';
import {
  useGetLikeStatusQuery,
  useToggleLikeMutation,
} from '../../store/postsApi';
import { useDispatch } from 'react-redux';
import { toggleBookmarks } from '../../store/user/thunks';
import { copyUrlToClipboard } from '../../utils/copyUrlToClipboard';

function PostStats({ postStats }) {
  const { countsReply, likesLength, postId, authorTag } = postStats;
  const dispatch = useDispatch();
  
  const { tag: userTag, bookmarks, uid } = useUserProfile();
  const [toggleLike] = useToggleLikeMutation();
  const { data: isLiked } = useGetLikeStatusQuery({ postId, uid });
  const isBookmarked = bookmarks.includes(postId);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleLike({ postId, uid });
  };

  const handleToggleBookmark = (e) => {
    e.stopPropagation();
    dispatch(toggleBookmarks({ userTag, postId }));
  };

  return (
    <div className={styles.postStats}>
      <div className={styles.stat}>
        <div className={styles.iconWrapper}>
          <IoChatboxOutline size={20} className={styles.icon} />
        </div>
        <span>{countsReply}</span>
      </div>

      <div
        className={`${styles.stat} ${isLiked ? styles.isLiked : ''}`}
        onClick={handleLikeClick}
      >
        <div className={`${styles.iconWrapper} ${styles.heart}`}>
          {isLiked ? (
            <FaHeart className={styles.icon} />
          ) : (
            <FaRegHeart className={styles.icon} />
          )}
        </div>
        <span className={styles.heartText}>{likesLength}</span>
      </div>

      <div className={styles.stat} onClick={handleToggleBookmark}>
        <div
          className={`${styles.iconWrapper} ${
            isBookmarked && styles.isBookmarked
          }`}
        >
          <FaBookmark size={20} className={styles.icon} />
        </div>
      </div>
      <div
        className={styles.stat}
        onClick={(e) => copyUrlToClipboard(e, authorTag, postId)}
      >
        <div className={styles.iconWrapper}>
          <FaRegCopy size={24} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default PostStats;
