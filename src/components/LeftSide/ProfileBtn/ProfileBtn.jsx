import { FaEllipsisH } from 'react-icons/fa';
import styles from './ProfileBtn.module.css';
import Avatar from '../../ui/Avatar/Avatar';
import ActionMenu from '../../ActionMenu/ActionMenu';
import useMenu from '../../../hooks/useMenu';
import { profileBtnMenuActions } from '../../../utils/menuActions';
import { useUserProfile } from '../../../hooks/useUserProfile';


function ProfileBtn() {
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const { name, tag, photoURL } = useUserProfile();
 
  return (
    <button className={styles.profileBtn} onClick={handleMenuOpen}>
      <Avatar photoURL={photoURL} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <h5>@{tag}</h5>
        {isMenuOpen && (
          <ActionMenu
            onClose={handleMenuClose}
            isVisible={isMenuOpen}
            items={profileBtnMenuActions}
          />
        )}
      </div>
      <FaEllipsisH className={styles.dots} size={14} />
    </button>
  );
}

export default ProfileBtn;
