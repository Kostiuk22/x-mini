import { FaRegUser } from 'react-icons/fa';
import { MdOutlineBlock } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { LuPin } from 'react-icons/lu';
import { deleteAllBookmarks, logout } from '@store/user/thunks';
import { resetChats } from '@store/messages/slices';

export const postMenuActions = (isFollowing, toggleFollow, handleMenuClose) => [
  {
    name: isFollowing ? 'Unfollow' : 'Follow',
    icon: FaRegUser,
    action: () => {
      toggleFollow();
      handleMenuClose();
    },
  },
  {
    name: 'Block',
    icon: MdOutlineBlock,
    color: 'red',
    action: () => {
      handleMenuClose();
      console.log('Coming soon!');
    },
  },
];

export const getCurrentUserMenuActions = (
  deletePost,
  postId,
  parentPostId,
  handleMenuClose,
  navigate
) => [
  {
    name: 'Delete',
    color: 'red',
    action: () => {
      handleMenuClose();
      navigate('/home');
      deletePost({ postId, parentPostId: parentPostId ?? null });
    },
  },
];

export const messagesMenuActions = (handleDeleteChat) => [
  { name: 'Pin conversation', icon: LuPin },
  {
    name: 'Delete',
    icon: RiDeleteBinLine,
    color: 'red',
    action: (e) => handleDeleteChat(e),
  },
];

export const bookmarksMenuActions = (dispatch, userId, handleMenuClose) => [
  {
    name: 'Clear all Bookmarks',
    color: 'red',
    action: () => {
      dispatch(deleteAllBookmarks(userId));
      handleMenuClose();
    },
  },
];

export const profileBtnMenuActions = [
  {
    name: 'Log out!',
    color: 'red',
    action: (dispatch) => {
      dispatch(logout());
      dispatch(resetChats());
    },
  },
];
