import styles from './BlueBtn.module.css';

function BlueBtn({
  children,
  sizeBtn = 'fullWidth',
  onClick,
  type = 'button',
  disabled = false,
}) {
  let sizeClass = '';

  switch (sizeBtn) {
    case 'fullWidth':
      sizeClass = styles.fullWidth;
      break;
    case 'big':
      sizeClass = styles.big;
      break;
    case 'small':
      sizeClass = styles.small;
      break;
    default:
      sizeClass = '';
  }

  return (
    <button
      className={`${styles.btn} ${sizeClass} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={disabled ? undefined : onClick}
      type={type}
      disabled={disabled}
    >
      <h3>{children}</h3>
    </button>
  );
}

export default BlueBtn;
