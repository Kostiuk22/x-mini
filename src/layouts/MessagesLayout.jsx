import styles from './MessagesLayout.module.css';

import Messages from '@pages/Messages/Messages';

import { Outlet, useLocation } from 'react-router-dom';
import { useWindowWidth } from '@hooks/useWindowWidth';

function MessagesLayout() {
  const [currentWidth] = useWindowWidth();
  const isMobile = currentWidth <= 1002;
  const location = useLocation();
  const isMainRoute = location.pathname === '/x.com/messages';
  return (
    <div className={styles.messagesLayout}>
      {(isMainRoute || !isMobile) && <Messages />}
      {(!isMainRoute || !isMobile) && (
        <div className={styles.messagesLayoutOutlet}>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default MessagesLayout;
