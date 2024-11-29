import styles from './NavList.module.css';
import {
  FaHome,
  FaSearch,
  FaEnvelope,
  FaBookmark,
  FaUser,
} from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

import NavItem from '../NavItem/NavItem';
import BlueBtn from '../../../ui/BlueBtn/BlueBtn';
import useMenu from '../../../../hooks/useMenu';
import useClickOutside from '../../../../hooks/useClickOutside';
import PostCreatedModal from '../../../PostCreatedModal/PostCreatedModal';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

function NavList() {
  const modalRef = useRef(null);
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  useClickOutside(modalRef, handleMenuClose);

  return (
    <div className={styles.leftSide}>
      <nav className={styles.list}>
        <NavItem name="Home">
          <FaHome color="white" size={24} />
        </NavItem>
        <NavItem name="Explore">
          <FaSearch color="white" size={24} />
        </NavItem>
        <NavItem name="Messages">
          <FaEnvelope color="white" size={24} />
        </NavItem>
        <NavItem name="Bookmarks">
          <FaBookmark color="white" size={24} />
        </NavItem>
        <NavItem name="Profile">
          <FaUser color="white" size={24} />
        </NavItem>
        <NavItem name="Settings">
          <MdOutlineSettings color="white" size={28} />
        </NavItem>
      </nav>
      <div className={styles.btn}>
        <BlueBtn onClick={handleMenuOpen}>Post</BlueBtn>
      </div>
      {isMenuOpen &&
        createPortal(
          <PostCreatedModal
            handleMenuClose={handleMenuClose}
            modalRef={modalRef}
          />,
          document.body
        )}
    </div>
  );
}

export default NavList;
