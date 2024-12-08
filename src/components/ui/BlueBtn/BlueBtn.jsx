import styles from './BlueBtn.module.css';

function BlueBtn({
  children,
  sizeBtn = 'fullWidth',
  onClick,
  type = 'button',
  disabled = false,
}) {
  const styleObj = {
    ['fullWidth']: styles.fullWidth,
    ['big']: styles.big,
    ['small']: styles.small,
  };

 

  return (
    <button
      className={`${styles.btn} ${sizeBtn ? styleObj[sizeBtn] : ''} ${
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
