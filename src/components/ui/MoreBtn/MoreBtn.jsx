import styles from './MoreBtn.module.css';

function MoreBtn({ onClick, mode = 'blue' }) {
  let blackMode = mode === 'black' ? `${styles.blackMode}` : '';

  const handleMoreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={handleMoreClick}
      className={`${styles.moreBtn} ${blackMode}`}
    >
      <span className={styles.dots}>•••</span>
    </button>
  );
}

export default MoreBtn;
