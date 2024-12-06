import styles from './SearchedUser.module.css';

import Avatar from '../ui/Avatar/Avatar';
import NickName from '../ui/NickName/NickName';

import { FaCheck } from 'react-icons/fa';

function SearchedUser({ user, onClick, isSelected }) {
  const { tag, name, photoURL } = user;

  return (
    <div className={styles.userItem} onClick={onClick}>
      <Avatar photoURL={photoURL} />
      <div className={styles.content}>
        <div className={styles.info}>
          <NickName userName={name} tag={tag} />
          <h5>@{tag}</h5>
        </div>
        {isSelected && <FaCheck />}
      </div>
    </div>
  );
}

export default SearchedUser;
