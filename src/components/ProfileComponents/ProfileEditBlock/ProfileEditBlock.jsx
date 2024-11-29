import { createPortal } from 'react-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import useMenu from '../../../hooks/useMenu';
import EditUserProfile from '../../EditUserProfile/EditUserProfile';
import styles from './ProfileEditBlock.module.css';
import { useRef } from 'react';

function ProfileEditBlock() {
  const modalRef = useRef(null);
  const { isMenuOpen, handleMenuClose, handleMenuOpen } = useMenu();
  useClickOutside(modalRef, handleMenuClose);
  return (
    <>
      <button className={styles.editBtn} onClick={handleMenuOpen}>
        Edit profile
      </button>
      {isMenuOpen &&
        createPortal(
          <EditUserProfile
            handleMenuClose={handleMenuClose}
            modalRef={modalRef}
          />,
          document.body
        )}
    </>
  );
}

export default ProfileEditBlock;
