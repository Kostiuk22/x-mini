import styles from './ShowMoreBtn.module.css';

function ShowMoreBtn({ onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button className={styles.showMoreBtn} onClick={handleClick}>
      Show more
    </button>
  );
}

export default ShowMoreBtn;
