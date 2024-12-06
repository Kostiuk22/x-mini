import styles from './RightSide.module.css';

import Footer from './Footer/Footer';
import Trending from './Trending/Trending';
import WhoToFollow from './WhoToFollow/WhoToFollow';

import { useLocation } from 'react-router-dom';

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
