import styles from './Footer.module.css';
import FooterItem from './FooterItem./FooterItem';

let footerItems = [
  'Terms of Service',
  'Privacy Policy',
  'Cookie Policy',
  'Accessebility',
  'Ads info',
  'More',
];

function Footer() {
  return (
    <ul className={styles.footer}>
      {footerItems.map((el) => (
        <FooterItem key={el} text={el} />
      ))}
      <li>© 2024 X Corp.</li>
    </ul>
  );
}

export default Footer;
