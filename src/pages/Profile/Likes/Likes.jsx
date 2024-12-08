import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';
import PostPreview from '@components/PostPreview/PostPreview';
import InfoBlock from '@components/ui/InfoBlock/InfoBlock';

import { useGetLikedPostsByUserQuery } from '@store/postsApi';
import { useUserProfile } from '@hooks/useUserProfile';

function Likes() {
  const userId = useUserProfile().uid
  const {
    data: likedPosts,
    isLoading,
    error,
  } = useGetLikedPostsByUserQuery(userId);

  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {likedPosts.map((post) => (
        <PostPreview key={post.postId} post={post} />
      ))}
      {likedPosts.length === 0 && (
        <InfoBlock
          title="No likes yet"
          text="Liked posts will be displayed here"
        />
      )}
    </>
  );
}

export default Likes;
