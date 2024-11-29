import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../store/user/thunks';

export const useFollow = (currentUserId, targetUserId) => {
  const dispatch = useDispatch();
  const following =
    useSelector((state) => state.user.userProfile.following) || [];
  const isFollowing = following.includes(targetUserId);

  const toggleFollow = () => {
    if (isFollowing) {
      dispatch(unfollowUser({ currentUserId, targetUserId }));
    }
    if (!isFollowing) {
      dispatch(followUser({ currentUserId, targetUserId }));
    }
  };

  return { isFollowing, toggleFollow };
};
