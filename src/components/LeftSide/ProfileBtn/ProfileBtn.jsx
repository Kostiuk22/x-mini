import styles from './ProfileBtn.module.css';

import { FaEllipsisH } from 'react-icons/fa';
import Avatar from '@components/ui/Avatar/Avatar';
import ActionMenu from '@components/ActionMenu/ActionMenu';
import useMenu from '@hooks/useMenu';
import { profileBtnMenuActions } from '@utils/menuActions';
import { useUserProfile } from '@hooks/useUserProfile';

function ProfileBtn() {
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const { name, tag, photoURL } = useUserProfile();

  return (
    <button className={styles.profileBtn} onClick={handleMenuOpen}>
      <Avatar photoURL={photoURL} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <h5>@{tag}</h5>
      </div>
      <FaEllipsisH className={styles.dots} size={14} />
      {isMenuOpen && (
        <ActionMenu
          onClose={handleMenuClose}
          isVisible={isMenuOpen}
          items={profileBtnMenuActions}
          relPosition='left'
        />
      )}
    </button>
  );
}

export default ProfileBtn;
