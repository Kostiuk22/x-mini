import styles from './NavList.module.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  FaHome,
  FaSearch,
  FaRegBookmark,
  FaRegEnvelope,
  FaRegUser,
} from 'react-icons/fa';
import { PiPencilLine } from 'react-icons/pi';
import { MdOutlineSettings } from 'react-icons/md';

import NavItem from '../NavItem/NavItem';
import PostCreatedModal from '../../../PostCreatedModal/PostCreatedModal';
import BlueBtn from '../../../ui/BlueBtn/BlueBtn';
import useMenu from '../../../../hooks/useMenu';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import useClickOutside from '../../../../hooks/useClickOutside';

function NavList() {
  const modalRef = useRef(null);
  const [currentWidth] = useWindowWidth();
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  useClickOutside(modalRef, handleMenuClose);

  return (
    <div className={styles.leftSide}>
      <nav className={styles.list}>
        <NavItem name="Home">
          <FaHome />
        </NavItem>
        <NavItem name="Explore">
          <FaSearch />
        </NavItem>
        <NavItem name="Messages">
          <FaRegEnvelope />
        </NavItem>
        <NavItem name="Bookmarks">
          <FaRegBookmark />
        </NavItem>
        <NavItem name="Profile">
          <FaRegUser />
        </NavItem>
        <NavItem name="Settings">
          <MdOutlineSettings color="white" size={28} />
        </NavItem>
      </nav>
      <div className={styles.btn}>
        <BlueBtn sizeBtn="big" onClick={handleMenuOpen}>
          {currentWidth <= 1279 ? <PiPencilLine /> : 'Post'}
        </BlueBtn>
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
