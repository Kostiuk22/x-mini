import styles from './PostPreview.module.css';

import Avatar from '../ui/Avatar/Avatar';
import MoreBtn from '../ui/MoreBtn/MoreBtn';
import NickName from '../ui/NickName/NickName';
import ReplyTabList from '../ui/ReplyTabList/ReplyTabList';
import useMenu from '@hooks/useMenu';
import ActionMenu from '../ActionMenu/ActionMenu';
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner';

import { getCurrentUserMenuActions, postMenuActions } from '@utils/menuActions';
import { transformDate } from '@utils/transformDate';
import { Link, useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '@store/postsApi';
import { useUserProfile } from '@hooks/useUserProfile';
import { useUserById } from '@hooks/useUserById';
import { useFollow } from '@hooks/useFollow';

function PostPreview({ post }) {
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const navigate = useNavigate();
  const {
    postId,
    text,
    media,
    createdAt,
    replies,
    likes,
    numberOfViews,
    authorUid,
    parentPostId,
  } = post;
  const {
    user: author,
    isLoading: isLoadingAuthor,
    error,
  } = useUserById(authorUid);

  const { tag: curUserTag, uid } = useUserProfile();
  const [deletePost] = useDeletePostMutation();
  const { isFollowing, toggleFollow } = useFollow(uid, authorUid);

  if (isLoadingAuthor || error || !author)
    return (
      <div className={styles.postPreview}>
        <LoadingSpinner />
      </div>
    );

  const isPostOfCurrentUser = curUserTag === author?.tag;
  const createdPostAt = new Date(createdAt);
  const formattedDate =
    transformDate(createdAt).slice(0, 3) + ' ' + createdPostAt.getDate();

  const currentUserMenuActions = getCurrentUserMenuActions(
    deletePost,
    postId,
    parentPostId,
    handleMenuClose,
    navigate
  );

  return (
    <Link
      to={`/${author.tag}/status/${postId}`}
      className={styles.postPreview}
    >
      <Avatar photoURL={author.photoURL} />
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <div className={styles.headerRowInfo}>
            <NickName userName={author.name} tag={author.tag} />
            <h6>@{author.tag}</h6>
            <h6>•</h6>
            <span>{formattedDate}</span>
          </div>
          <div className={styles.headerRowBtn}>
            <MoreBtn onClick={handleMenuOpen} />
            {isMenuOpen && (
              <ActionMenu
                onClose={handleMenuClose}
                isVisible={isMenuOpen}
                isPostOfCurrentUser
                items={
                  isPostOfCurrentUser
                    ? currentUserMenuActions
                    : postMenuActions(
                        isFollowing,
                        toggleFollow,
                        handleMenuClose
                      )
                }
              />
            )}
          </div>
        </div>

        <div className={styles.postText}>{text}</div>
        {Object.entries(media).length > 0 && (
          <div className={styles.postMedia}>
            {media.map((el) => {
              const mediaTypeImg = el.file.startsWith('data:image/');
              const mediaTypeVideo = el.file.startsWith('data:video/');
              if (mediaTypeImg) {
                return (
                  <img
                    src={el.file}
                    key={el.fileId}
                    className={styles.postMediaItem}
                  />
                );
              } else if (mediaTypeVideo) {
                return <video src={el.file} key={el.videoId} />;
              } else {
                <h3>{"Can't loadiang this type of media"}</h3>;
              }
            })}
          </div>
        )}

        <ReplyTabList
          postStats={{
            postId: postId,
            likesLength: likes.length,
            numberOfViews: numberOfViews,
            countsReply: replies.length,
            authorTag: author?.tag,
          }}
        />
      </div>
    </Link>
  );
}

export default PostPreview;
