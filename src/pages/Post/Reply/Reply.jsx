import styles from './Reply.module.css';

import ActionMenu from '../../../components/ActionMenu/ActionMenu';
import Avatar from '../../../components/ui/Avatar/Avatar';
import MoreBtn from '../../../components/ui/MoreBtn/MoreBtn';
import NickName from '../../../components/ui/NickName/NickName';
import ReplyTabList from '../../../components/ui/ReplyTabList/ReplyTabList';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import useMenu from '../../../hooks/useMenu';

import {
  useDeletePostMutation,
  useGetPostQuery,
} from '../../../store/postsApi';
import { Link, useNavigate } from 'react-router-dom';
import { formatPostDate } from '../../../utils/formatPostDate';
import { useUserById } from '../../../hooks/useUserById';
import {
  getCurrentUserMenuActions,
  postMenuActions,
} from '../../../utils/menuActions';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { useFollow } from '../../../hooks/useFollow';

function Reply({ replyId }) {
  const { isMenuOpen, handleMenuClose, handleMenuOpen } = useMenu();
  const navigate = useNavigate();
  const { data: reply, isLoading } = useGetPostQuery(replyId);
  const [deletePost] = useDeletePostMutation();

  const { user: author, isLoading: isLoadingUser } = useUserById(
    reply?.authorUid
  );
  const { tag: curUserTag, uid } = useUserProfile();
  const { isFollowing, toggleFollow } = useFollow(uid, author?.uid);

  if (isLoading || isLoadingUser || !author) return <LoadingSpinner />;
  
  const { createdAt, text, media } = reply;
  const formattedDate = formatPostDate(createdAt);

  const isPostOfCurrentUser = curUserTag === author?.tag;
  const currentUserMenuActions = getCurrentUserMenuActions(
    deletePost,
    reply.postId,
    reply.parentPostId,
    handleMenuClose,
    navigate
  );

  return (
    <Link
      to={`/x.com/${author.tag}/status/${replyId}`}
      className={`${styles.reply} wrapper`}
    >
      <Avatar photoURL={author.photoURL} />
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.left}>
            <NickName userName={author.name} tag={author.tag} />
            <h5>
              @{author.tag} · <span>{formattedDate}</span>
            </h5>
          </div>
          <div className={styles.right}>
            <MoreBtn onClick={handleMenuOpen} />
            {isMenuOpen && (
              <ActionMenu
                onClose={handleMenuClose}
                isVisible={isMenuOpen}
                isPostOfCurrentUser
                items={
                  isPostOfCurrentUser
                    ? currentUserMenuActions
                    : postMenuActions(isFollowing, toggleFollow)
                }
              />
            )}
          </div>
        </div>
        <div className={styles.text}>
          <p>{text}</p>
          {Object.entries(media).length > 0 && (
          <div className={styles.replyMedia}>
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
        </div>

        <ReplyTabList
          postStats={{
            countsReply: reply.replies.length,
            postId: replyId,
            likesLength: reply?.likes.length,
            numberOfViews: reply?.numberOfViews,
            authorTag: author?.tag,
          }}
        />
      </div>
    </Link>
  );
}

export default Reply;
