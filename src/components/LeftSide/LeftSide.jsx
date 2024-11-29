import styles from './LeftSide.module.css';

import NavList from './Nav/NavList/NavList';
import ProfileBtn from './ProfileBtn/ProfileBtn';

function LeftSide() {
  return (
    <div className={styles.leftSide}>
      <NavList />
      <ProfileBtn />
    </div>
  )
}

export default LeftSide
