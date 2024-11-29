import styles from './ReplyTabList.module.css';
import { IoChatboxOutline } from 'react-icons/io5';
//import { BiRepost } from 'react-icons/bi';
import { FaRegHeart, FaBookmark, FaHeart } from 'react-icons/fa';
import { RiShare2Line } from 'react-icons/ri';
import { IoIosStats } from 'react-icons/io';
import { useUserProfile } from '../../../hooks/useUserProfile';
import {
  useGetLikeStatusQuery,
  useIncrementCountViewsMutation,
  useToggleLikeMutation,
} from '../../../store/postsApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleBookmarks } from '../../../store/user/thunks';

function ReplyTabList({ postStats }) {
  const dispatch = useDispatch();
  const { countsReply, postId, likesLength, numberOfViews } = postStats;
  const { tag: userTag, bookmarks } = useUserProfile();
  const [toggleLike] = useToggleLikeMutation();
  const { data: isLiked } = useGetLikeStatusQuery({ postId, userTag });
  //const { data: numberOfViews } = useGetNumberViewsQuery(postId);
  const [incrementCountViews] = useIncrementCountViewsMutation();
  const isBookmarked = bookmarks?.includes(postId);



  useEffect(() => {
    incrementCountViews(postId);
  }, [incrementCountViews, postId]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleLike({ postId, userTag });
  };

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleBookmarks({ userTag, postId }));
  };

  return (
    <div className={styles.list}>
      <div className={styles.stat}>
        <div className={styles.iconWrapper}>
          <IoChatboxOutline className={styles.icon} />
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

      <div className={styles.stat}>
        <div className={`${styles.iconWrapper} ${styles.repost}`}>
          <IoIosStats className={styles.icon} />
        </div>
        {numberOfViews && <span className={styles.views}>{numberOfViews}</span>}
      </div>

      <div className={styles.double}>
        <div className={styles.stat} onClick={handleToggleBookmark}>
          <div
            className={`${styles.iconWrapper} ${
              isBookmarked && styles.isBookmarked
            }`}
          >
            <FaBookmark className={styles.icon} />
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.iconWrapper}>
            <RiShare2Line className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyTabList;
