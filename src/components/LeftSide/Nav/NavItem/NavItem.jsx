import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';
import { useUserProfile } from '../../../../hooks/useUserProfile';

function NavItem({ name, children }) {
  let path = name.toLowerCase();
  const { tag } = useUserProfile();

  if (path === 'bookmarks') {
    path = 'i/bookmarks';
  } else if (path === 'profile') {
    path = tag;
  } else if (path === 'settings') {
    path = 'settings/change_tag';
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
