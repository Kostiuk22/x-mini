import PostPreview from '../PostPreview/PostPreview';

function PostsList({ items }) {
  const render = items.map((item) => (
    <PostPreview key={item.postId} post={item} />
  ));
  return <>{render}</>;
}

export default PostsList;
