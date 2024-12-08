import styles from './ActionMenu.module.css';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import ActionMenuItem from '../ActionMenuItem/ActionMenuItem';
import useClickOutside from '@hooks/useClickOutside';
import useMenuPosition from '@hooks/useMenuPosition';

function ActionMenu({
  onClose,
  isVisible,
  size = 'small',
  items,
  isPostOfCurrentUser,
}) {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const position = useMenuPosition(menuRef);
  useClickOutside(menuRef, onClose);

  let sizeStyles = '';
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
