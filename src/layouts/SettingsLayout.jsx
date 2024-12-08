import styles from './SettingsLayout.module.css';

import Settings from '@pages/Settings/Settings';

import { Outlet, useLocation } from 'react-router-dom';
import { useWindowWidth } from '@hooks/useWindowWidth';

function SettingsLayout() {
  const [currentWidth] = useWindowWidth();
  const isMobile = currentWidth <= 1002;
  const location = useLocation();
  const isMainRoute = location.pathname === '/x.com/settings';

  return (
    <div className={styles.settingsLayout}>
      {(isMainRoute || !isMobile) && <Settings />}

      {(!isMainRoute || !isMobile) && (
        <div className={styles.settingsLayoutOutlet}>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default SettingsLayout;
