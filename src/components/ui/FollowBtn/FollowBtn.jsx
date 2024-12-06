import styles from './FollowBtn.module.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../../store/user/thunks';

function FollowBtn({ currentUserId, targetUserId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const following =
    useSelector((state) => state.user.userProfile.following) || [];
  const isFollowing = following.includes(targetUserId);
  const [statusText, setStatusText] = useState(
    isFollowing ? 'Following' : 'Follow'
  );

  useEffect(() => {
    setStatusText(isFollowing ? 'Following' : 'Follow');
  }, [isFollowing]);

  const handleTextChange = () => {
    if (statusText === 'Following') {
      setStatusText('Unfollow');
    }
  };

  const handleTextReturn = () => {
    if (statusText === 'Unfollow') {
      setStatusText('Following');
    }
  };

  const toggleBtnStatus = (e) => {
    e.stopPropagation();
    if (statusText === 'Follow') {
      setStatusText('Following');
      setIsProcessing(true);
      dispatch(followUser({ currentUserId, targetUserId }));
      setIsProcessing(false);
    } else if (statusText === 'Following') {
      setStatusText('Unfollow');
    } else if (statusText === 'Unfollow') {
      setIsProcessing(true);
      dispatch(unfollowUser({ currentUserId, targetUserId }));
      setIsProcessing(false);
      setStatusText('Follow');
    }
  };

  const getBtnClass = () => {
    if (statusText === 'Unfollow') {
      return styles.unfollowBtn;
    } else if (statusText === 'Following') {
      return styles.followingBtn;
    }
    return styles.followBtn;
  };

  return (
    <button
      className={`${styles.btn} ${getBtnClass()}`}
      onMouseEnter={handleTextChange}
      onMouseLeave={handleTextReturn}
      onClick={toggleBtnStatus}
      disabled={isProcessing}
    >
      <h4>{statusText}</h4>
    </button>
  );
}

export default FollowBtn;
