import { NavLink } from 'react-router-dom';
import styles from './SettingsItem.module.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

function SettingsItem({ text, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${styles.item} ${styles.active}` : `${styles.item}`
      }
      end
    >
      <p>{text}</p>
      <MdOutlineKeyboardArrowRight size={23} color="grey" />
    </NavLink>
  );
}

export default SettingsItem;
