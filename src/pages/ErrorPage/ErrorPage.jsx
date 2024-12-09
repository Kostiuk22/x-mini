import BlueBtn from '@components/ui/BlueBtn/BlueBtn';
import styles from './ErrorPage.module.css';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.errPage}>
      <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
      <BlueBtn onClick={() => navigate('/explore')} sizeBtn="small">
        Search
      </BlueBtn>
    </div>
  );
}

export default ErrorPage;
