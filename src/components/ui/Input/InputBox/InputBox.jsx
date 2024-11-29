import ErrorMessageField from '../../ErrorMessageField/ErrorMessageField';
import styles from './InputBox.module.css';

function InputBox({
  children,
  label,
  maxCharacter,
  currentCharacter,
  errMessage,
}) {
  return (
    <div>
      <div
        className={`${styles.inputBox} ${errMessage && styles.error}`}
        tabIndex={0}
      >
        <div className={styles.placeholderBox}>
          <div className={styles.placeholderText}>
            <span>{label}</span>
          </div>
          {maxCharacter && (
            <p className={styles.placeholderCounter}>
              {currentCharacter}/{maxCharacter}
            </p>
          )}
        </div>
        {children}
      </div>

      {errMessage && <ErrorMessageField text={errMessage} />}
    </div>
  );
}

export default InputBox;
