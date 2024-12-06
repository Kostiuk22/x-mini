import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import PostPreview from '../../../components/PostPreview/PostPreview';
import InfoBlock from '../../../components/ui/InfoBlock/InfoBlock';

import { useGetLikedPostsByUserQuery } from '../../../store/postsApi';
import { useParams } from 'react-router-dom';

function Likes() {
  const userTag = useParams().tag;
  const {
    data: likedPosts,
    isLoading,
    error,
  } = useGetLikedPostsByUserQuery(userTag);

  
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
