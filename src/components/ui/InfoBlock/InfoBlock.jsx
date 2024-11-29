import styles from './InfoBlock.module.css';

function InfoBlock({ title, text }) {
  return (
    <div className={styles.description}>
      <div className={styles.box}>
        <h1>{title}</h1>
        <h5>{text}</h5>
      </div>
    </div>
  );
}

export default InfoBlock;
