import { useSelector } from 'react-redux';

export const useUserProfile = () => {
  const userProfile = useSelector((state) => state.user.userProfile);
  return userProfile;
};
