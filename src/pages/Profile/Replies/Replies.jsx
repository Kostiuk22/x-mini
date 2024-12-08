import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';
import PostPreview from '@components/PostPreview/PostPreview';
import InfoBlock from '@components/ui/InfoBlock/InfoBlock';

import { useParams } from 'react-router-dom';
import { useGetPostsByUserTagQuery } from '@store/postsApi';

function Replies() {
  const userTag = useParams().tag;
  const { data: replies, isLoading } = useGetPostsByUserTagQuery(userTag);

  if (isLoading) return <LoadingSpinner />;
  const repliesForRender = replies
    ? replies
        .filter((post) => 'parentPostId' in post)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
  return (
    <>
      {repliesForRender.map((post) => (
        <PostPreview key={post.postId} post={post} />
      ))}
      {repliesForRender.length === 0 && (
        <InfoBlock
          title="No replies yet"
          text="Replie posts will be displayed here"
        />
      )}
    </>
  );
}

export default Replies;
