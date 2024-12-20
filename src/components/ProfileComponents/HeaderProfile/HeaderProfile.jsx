import styles from './HeaderProfile.module.css';

import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function HeaderProfile({ name, tag }) {
  return (
    <>
      <div className="stickyWrapper">
        <header className={styles.header}>
          <Link to=".." className={styles.icon}>
            <FaArrowLeft size={15} />
          </Link>
          <div className={styles.title}>
            <h2>{name}</h2>
            {<p>@{tag}</p>}
          </div>
        </header>
      </div>
    </>
  );
}

export default HeaderProfile;
