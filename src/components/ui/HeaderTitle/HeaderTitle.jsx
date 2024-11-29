import styles from './HeaderTitle.module.css';

function HeaderTitle({ title }) {
  return (
    <header className={styles.head}>
      <h2>{title}</h2>
    </header>
  );
}

export default HeaderTitle;
