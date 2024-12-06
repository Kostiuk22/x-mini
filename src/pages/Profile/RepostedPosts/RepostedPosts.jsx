import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import PostPreview from '../../../components/PostPreview/PostPreview';
import InfoBlock from '../../../components/ui/InfoBlock/InfoBlock';

import { useParams } from 'react-router-dom';
import { useGetPostsByUserTagQuery } from '../../../store/postsApi';

function RepostedPosts() {
  const userTag = useParams().tag;
  const { data: posts, isLoading } = useGetPostsByUserTagQuery(userTag);

  if (isLoading) return <LoadingSpinner />;
  const postsForRender = posts
    ? posts
        .filter((post) => !('parentPostId' in post))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
  return (
    <>
      {postsForRender.map((post) => (
        <PostPreview key={post.postId} post={post} />
      ))}
      {postsForRender.length === 0 && (
        <InfoBlock
          title="No posts yet"
          text="Posts will be displayed here"
        />
      )}
    </>
  );
}

export default RepostedPosts;
