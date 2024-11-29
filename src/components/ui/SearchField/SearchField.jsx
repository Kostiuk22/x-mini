import { FaSearch } from 'react-icons/fa';
import styles from './SearchField.module.css';
import { IoMdCloseCircle } from 'react-icons/io';

function SearchField({ placeholderText, variant = 'primary', text, onChange }) {
  let searchStyle =
    variant === 'primary' ? `${styles.search}` : `${styles.searchModified}`;
  let iconStyle =
    variant === 'primary' ? `${styles.icon}` : `${styles.iconModified}`;

  let inputStyle =
    variant === 'primary' ? `${styles.inpText}` : `${styles.inputModified}`;

  return (
    <div className={searchStyle}>
      <div className={styles.left}>
        <FaSearch className={iconStyle} />
      </div>
      <input
        className={inputStyle}
        type="text"
        placeholder={placeholderText}
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
      {text && (
        <div className={styles.right} onClick={() => onChange('')}>
          <IoMdCloseCircle />
        </div>
      )}
    </div>
  );
}

export default SearchField;
