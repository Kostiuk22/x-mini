import styles from './Bookmarks.module.css';

import InfoBlock from '@components/ui/InfoBlock/InfoBlock';
import MoreBtn from '@components/ui/MoreBtn/MoreBtn';
import ActionMenu from '@components/ActionMenu/ActionMenu';
import useMenu from '@hooks/useMenu';
import PostPreview from '@components/PostPreview/PostPreview';

import { bookmarksMenuActions } from '@utils/menuActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ProfileRequests } from '@services/ProfileRequests';
import { useUserProfile } from '@hooks/useUserProfile';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch();
  const userId = useUserProfile().uid;
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const bookmarkedPostsId = useSelector(
    (state) => state.user.userProfile.bookmarks
  );
  const bookmarksLength = bookmarks.length;

  useEffect(() => {
    const fetch = async () => {
      const data = await ProfileRequests.getBookmarkedPosts(bookmarkedPostsId);
      setBookmarks(data);
    };
    fetch();
  }, [bookmarkedPostsId]);

  return (
    <div className={styles.bookmarks}>
      <div className={`${styles.head} stickyWrapper`}>
        <div className={styles.row}>
          <header className={styles.title}>
            <h2>Bookmarks</h2>
            <h5>@rL7yihMYuYJUK9c</h5>
          </header>
          {bookmarksLength > 0 && (
            <MoreBtn mode="black" onClick={handleMenuOpen} />
          )}
          {isMenuOpen && (
            <ActionMenu
              onClose={handleMenuClose}
              isVisible={isMenuOpen}
              items={bookmarksMenuActions(dispatch, userId, handleMenuClose)}
            />
          )}
        </div>
      </div>

      {bookmarksLength == 0 && (
        <InfoBlock
          title="Save posts for later"
          text="Bookmark posts to easily find them again in the future."
        />
      )}
      {bookmarks.map((bookmark) => (
        <PostPreview key={bookmark.postId} post={bookmark} />
      ))}
    </div>
  );
}

export default Bookmarks;
