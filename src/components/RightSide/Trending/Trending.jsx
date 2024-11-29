import ShowMoreBtn from '../../ui/ShowMoreBtn/ShowMoreBtn';
import styles from './Trending.module.css';
import TrendItem from './TrendItem/TrendItem';

function Trending() {
  return (
    <div className={`${styles.trending} box`}>
      <h2>Trends for you</h2>
      <TrendItem />
      <TrendItem />
      <TrendItem postQnt="123" />
      <TrendItem postQnt="123" />
      <TrendItem postQnt="123" />
      <TrendItem />
      <TrendItem />
      <TrendItem />
      <TrendItem />
      <TrendItem />
      <ShowMoreBtn />
    </div>
  );
}

export default Trending;
