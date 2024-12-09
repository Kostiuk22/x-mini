import styles from './NavBar.module.css';

import { NavLink } from 'react-router-dom';

function NavBar({ isAuthedUser, tag }) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navItem}>
        <NavLink
          to={`/${tag}`}
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Posts
        </NavLink>
      </div>
      <div className={styles.navItem}>
        <NavLink
          to={`/${tag}/with_replies`}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Replies
        </NavLink>
      </div>
   
      <div className={styles.navItem}>
        <NavLink
          to={`/${tag}/media`}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Media
        </NavLink>
      </div>
      {isAuthedUser && (
        <div className={styles.navItem}>
          <NavLink
            to={`/${tag}/likes`}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Likes
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
