import { useNavigate } from 'react-router-dom';
import styles from './NickName.module.css';

function NickName({ userName, tag }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/x.com/${tag}`);
  };
  return (
    <div onClick={handleClick} className={styles.nickName}>
      <p>{userName}</p>
    </div>
  );
}

export default NickName;
