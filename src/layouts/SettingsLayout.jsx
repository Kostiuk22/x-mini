import styles from './SettingsLayout.module.css';
import { Outlet } from 'react-router-dom';
import Settings from '../pages/Settings/Settings';

function SettingsLayout() {
  return (
    <div className={styles.settingsLayout}>
      <Settings />
      <div className={styles.settingsLayoutOutlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;
