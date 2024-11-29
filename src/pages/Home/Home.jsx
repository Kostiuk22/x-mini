import { useState } from 'react';
import styles from './Home.module.css';
import PostCreatedField from '../../components/PostCreatedField/PostCreatedField';
import { useGetFeedQuery, useGetPostsQuery } from '../../store/postsApi';
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';
import { useUserProfile } from '../../hooks/useUserProfile';
import PostsList from '../../components/PostsList/PostsList';
import ShowMoreBtn from '../../components/ui/ShowMoreBtn/ShowMoreBtn';

function Home() {
  const userId = useUserProfile().uid;
  const [activeSection, setActiveSection] = useState('forYou');
  const [limitPosts, setLimitPosts] = useState(5);
  const { data: posts, isLoading } = useGetPostsQuery(limitPosts);
  const { data: feed, isLoading: isLoadingFeed } = useGetFeedQuery(userId);

  if (isLoading || isLoadingFeed || !userId) return <LoadingSpinner />;

  const loadMore = () => {
    setLimitPosts((prev) => prev + 5);
  };

  return (
    <div className={styles.home}>
      <div className={`stickyWrapper ${styles.navMenu}`}>
        <button
          className={
            activeSection === 'forYou'
              ? `${styles.btn} ${styles.active}`
              : `${styles.btn}`
          }
          onClick={() => setActiveSection('forYou')}
        >
          For you
        </button>
        <button
          className={
            activeSection === 'following'
              ? `${styles.btn} ${styles.active}`
              : `${styles.btn}`
          }
          onClick={() => setActiveSection('following')}
        >
          Following
        </button>
      </div>
      <PostCreatedField />
      <PostsList items={activeSection === 'forYou' ? posts : feed} />
      {posts && posts.length >= limitPosts && (
        <ShowMoreBtn onClick={loadMore} />
      )}
    </div>
  );
}

export default Home;