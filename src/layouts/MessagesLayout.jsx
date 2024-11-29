import { Outlet } from 'react-router-dom';
import Messages from '../pages/Messages/Messages';
import styles from './MessagesLayout.module.css';

function MessagesLayout() {
  return (
    <div className={styles.messagesLayout}>
      <Messages />
      <div className={styles.messagesLayoutOutlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default MessagesLayout;
