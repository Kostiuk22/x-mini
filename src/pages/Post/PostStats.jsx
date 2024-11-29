import styles from './PostStats.module.css';
import { IoChatboxOutline } from 'react-icons/io5';
//import { BiRepost } from 'react-icons/bi';
import { FaBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import { RiShare2Line } from 'react-icons/ri';
import { useUserProfile } from '../../hooks/useUserProfile';
import {
  useGetLikeStatusQuery,
  useToggleLikeMutation,
} from '../../store/postsApi';
import { useDispatch } from 'react-redux';
import { toggleBookmarks } from '../../store/user/thunks';

function PostStats({ postStats }) {
  const dispatch = useDispatch();
  const { countsReply, likesLength, postId } = postStats;
  const { tag: userTag, bookmarks } = useUserProfile();
  const [toggleLike] = useToggleLikeMutation();
  const { data: isLiked } = useGetLikeStatusQuery({ postId, userTag });
  const isBookmarked = bookmarks.includes(postId);


  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleLike({ postId, userTag });
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
      <div className={styles.stat}>
        <div className={styles.iconWrapper}>
          <RiShare2Line size={24} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default PostStats;
