import styles from './NavItem.module.css';

import { NavLink } from 'react-router-dom';

import { useUserProfile } from '../../../../hooks/useUserProfile';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

function NavItem({ name, children }) {
  const [currentWidth] = useWindowWidth();
  const { tag } = useUserProfile();

  const isMobile = currentWidth <= 1002;
  let path = name.toLowerCase();

  if (path === 'bookmarks') {
    path = 'i/bookmarks';
  } else if (path === 'profile') {
    path = tag;
  } else if (path === 'settings' && !isMobile) {
    path = 'settings/change_tag';
  } else if (path === 'settings' && isMobile) {
    path = 'settings';
  } else if (path === '') {
    path = 'home';
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`
      }
    >
      <div className={styles.content}>
        <span className={styles.icon}>{children}</span>
        <h4 className={styles.name}>{name}</h4>
      </div>
    </NavLink>
  );
}

export default NavItem;
