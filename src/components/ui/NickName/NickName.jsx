import styles from './NickName.module.css';
import { useNavigate } from 'react-router-dom';

function NickName({ userName, tag }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/${tag}`);
  };
  return (
    <div onClick={handleClick} className={styles.nickName}>
      <p>{userName}</p>
    </div>
  );
}

export default NickName;
