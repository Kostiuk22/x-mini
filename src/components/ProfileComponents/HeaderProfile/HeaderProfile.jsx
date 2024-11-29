import { Link } from 'react-router-dom';
import styles from './HeaderProfile.module.css';
import { FaArrowLeft } from 'react-icons/fa';

function HeaderProfile({ name }) {
  return (
    <>
      <div className="stickyWrapper">
        <header className={styles.header}>
          <Link to=".." className={styles.icon}>
            <FaArrowLeft size={15} />
          </Link>
          <div className={styles.title}>
            <h2>{name}</h2>
            <p>35 posts</p>
          </div>
        </header>
      </div>
    </>
  );
}

export default HeaderProfile;
