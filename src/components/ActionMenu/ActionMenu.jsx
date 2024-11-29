import ActionMenuItem from '../ActionMenuItem/ActionMenuItem';
import styles from './ActionMenu.module.css';

import useClickOutside from '../../hooks/useClickOutside';
import { useRef } from 'react';
import useMenuPosition from '../../hooks/useMenuPosition';
import { useDispatch } from 'react-redux';

function ActionMenu({
  onClose,
  isVisible,
  size = 'small',
  items,
  isPostOfCurrentUser,
}) {
  let sizeStyles = '';
  const menuRef = useRef(null);
  useClickOutside(menuRef, onClose);
  const position = useMenuPosition(menuRef);
  const dispatch = useDispatch();

  switch (size) {
    case 'small':
      sizeStyles = styles.small;
      break;
  }

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.overlay}></div>
      <div
        ref={menuRef}
        className={`${styles.actionMenu} ${sizeStyles} ${
          position === 'bottom' ? '' : styles.bottom
        }`}
      >
        {items.map(({ name, icon, color, action }) => (
          <ActionMenuItem
            key={name}
            name={name}
            icon={icon ?? null}
            color={color}
            onClick={isPostOfCurrentUser ? action : () => action(dispatch)}
          />
        ))}
      </div>
    </>
  );
}

export default ActionMenu;
