import styles from './Settings.module.css';

import HeaderTitle from '../../components/ui/HeaderTitle/HeaderTitle';
import SettingsList from './SettingsList/SettingsList';

function Settings() {
  return (
    <div className={styles.settings}>
      <HeaderTitle title="Settings" />

      <SettingsList />
    </div>
  );
}

export default Settings;
