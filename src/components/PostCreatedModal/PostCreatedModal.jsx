import styles from './PostCreatedModal.module.css';

import PostCreatedField from '../PostCreatedField/PostCreatedField';
import { AiOutlineClose } from 'react-icons/ai';

function PostCreatedModal({ modalRef, handleMenuClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalBox}>
        <header>
          <button onClick={handleMenuClose}>
            <AiOutlineClose fill="white" className={styles.icon} />
          </button>
        </header>
        <PostCreatedField handleMenuClose={handleMenuClose}/>
      </div>
    </div>
  );
}

export default PostCreatedModal;
