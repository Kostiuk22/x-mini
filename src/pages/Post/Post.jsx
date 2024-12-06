import styles from './Post.module.css';

import HeaderTitle from '../../components/ui/HeaderTitle/HeaderTitle';
import NickName from '../../components/ui/NickName/NickName';
import PostInfo from './PostInfo';
import PostStats from './PostStats';
import SortReplies from '../../components/ui/SortReplies/SortReplies';
import Avatar from '../../components/ui/Avatar/Avatar';
import PostReply from './PostReply/PostReply';
import Reply from './Reply/Reply';
import MoreBtn from '../../components/ui/MoreBtn/MoreBtn';
import IsReposted from '../../components/ui/IsReposted/IsReposted';
import useMenu from '../../hooks/useMenu';
import ActionMenu from '../../components/ActionMenu/ActionMenu';
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';
import {
  getCurrentUserMenuActions,
  postMenuActions,
} from '../../utils/menuActions';
import { useDeletePostMutation, useGetPostQuery } from '../../store/postsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserById } from '../../hooks/useUserById';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useFollow } from '../../hooks/useFollow';

function Post({ media, isReposted = false }) {
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = useGetPostQuery(postId);
  const {
    user: author,
    isLoading: isLoadingAuthor,
    error,
  } = useUserById(post?.authorUid);

  const { tag: curUserTag, uid } = useUserProfile();
  const [deletePost] = useDeletePostMutation();
  const { isFollowing, toggleFollow } = useFollow(uid, author?.uid);

  if (isLoadingAuthor || !author || isLoading) return <LoadingSpinner />;

  if (isError || error) return <h1>Something went wrong...</h1>;

  const { createdAt, replies, text, parentPostId } = post;

  const isPostOfCurrentUser = curUserTag === author?.tag;
  const currentUserMenuActions = getCurrentUserMenuActions(
    deletePost,
    postId,
    parentPostId,
    handleMenuClose,
    navigate
  );

  return (
    <div className={styles.postPage}>
      <HeaderTitle title="Post" />
      <div className={styles.wrapper}>
        {isReposted && <IsReposted />}
        <header className={styles.header}>
          <Avatar photoURL={author.photoURL} />
          <div className={styles.spaceBetween}>
            <div className={styles.nickWithTag}>
              <NickName userName={author.name} tag={author.tag} />
              <h5>@{author.tag}</h5>
            </div>
            <MoreBtn onClick={handleMenuOpen} />
            {isMenuOpen && (
              <ActionMenu
                onClose={handleMenuClose}
                isVisible={isMenuOpen}
                items={
                  isPostOfCurrentUser
                    ? currentUserMenuActions
                    : postMenuActions(
                        isFollowing,
                        toggleFollow,
                        handleMenuClose
                      )
                }
                size="big"
              />
            )}
          </div>
        </header>
        <div className={styles.content}>
          {text ? text : ''}
          {media ? media : ''}
        </div>
        <PostInfo postInfo={{ createdAt, numberOfViews: post.numberOfViews }} />
        <PostStats
          postStats={{
            countsReply: replies.length,
            postId: postId,
            likesLength: post.likes.length,
            authorTag: author?.tag,
          }}
        />
        <SortReplies />
        <PostReply authorTag={author.tag} parentPostId={postId} />
      </div>
      {replies &&
        replies.map((replyId) => <Reply key={replyId} replyId={replyId} />)}
    </div>
  );
}

export default Post;
