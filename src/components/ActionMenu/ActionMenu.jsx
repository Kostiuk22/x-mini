import styles from './ActionMenu.module.css';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import ActionMenuItem from '../ActionMenuItem/ActionMenuItem';
import useClickOutside from '@hooks/useClickOutside';
import useMenuPosition from '@hooks/useMenuPosition';

function ActionMenu({
  onClose,
  isVisible,
  items,
  isPostOfCurrentUser,
  relPosition = 'right',
}) {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const position = useMenuPosition(menuRef);
  useClickOutside(menuRef, onClose);

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.overlay}></div>
      <div
        ref={menuRef}
        className={`${styles.actionMenu}  ${
          position === 'bottom' ? '' : styles.bottom
        } ${relPosition === 'left' ? styles.left : styles.right}`}
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
