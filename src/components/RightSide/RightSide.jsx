import { useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import styles from './RightSide.module.css';
import Trending from './Trending/Trending';
import WhoToFollow from './WhoToFollow/WhoToFollow';

function RightSide() {
  const curLocation = useLocation().pathname;
  const isExploreRoute = curLocation.split('/').includes('explore');
  return (
    <div className={styles.rightSide}>
      {!isExploreRoute && <Trending />}
      <WhoToFollow />
      <Footer />
    </div>
  );
}

export default RightSide;
