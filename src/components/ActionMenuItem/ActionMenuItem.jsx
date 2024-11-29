import styles from './ActionMenuItem.module.css';

function ActionMenuItem({ name, icon: Icon, color, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  return (
    <div className={styles.actionMenuItem} onClick={handleClick}>
      {Icon && (
        <Icon className={styles.icon} style={{ color: color || 'inherit' }} />
      )}

      <span style={{ color: color || 'inherit' }}>{name}</span>
    </div>
  );
}

export default ActionMenuItem;
