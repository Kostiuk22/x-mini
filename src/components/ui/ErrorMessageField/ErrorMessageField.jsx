import styles from './ErrorMessageField.module.css';
function ErrorMessageField({ text }) {
  return (
    <div className={styles.errBlock}>
      <h5 className={styles.errMsg}>{text}</h5>
    </div>
  );
}

export default ErrorMessageField;
