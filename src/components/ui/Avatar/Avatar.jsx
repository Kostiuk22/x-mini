import styles from './Avatar.module.css';
import defaultUserImg from '../../../assets/defaultUser.png';
import { memo } from 'react';

const Avatar = memo(({ photoURL }) => {
  const handleImageError = (e) => {
    e.target.src = defaultUserImg; 
  };

  return (
    <div className={styles.avatar}>
      <img
        src={photoURL || defaultUserImg}
        alt="Avatar"

        onError={handleImageError}
      />
    </div>
  );
});


Avatar.displayName = 'Avatar';

export default Avatar;
