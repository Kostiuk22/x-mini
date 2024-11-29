import styles from './FooterItem.module.css';

function FooterItem({ text }) {
  return (
    <li className={styles.footerItem}>
      <h5>{text}</h5>
    </li>
  );
}

export default FooterItem;
