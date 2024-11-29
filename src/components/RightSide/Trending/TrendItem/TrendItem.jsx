import styles from './TrendItem.module.css';

function TrendItem({ postQnt = null }) {
  return (
    <div className={styles.trend}>
      <div className={styles.info}>
        <h5>Trending in Ukraine</h5>
        <h3>Airdrop</h3>
        {postQnt && <h5>{postQnt} Posts</h5>}
      </div>
    </div>
  );
}

export default TrendItem;
