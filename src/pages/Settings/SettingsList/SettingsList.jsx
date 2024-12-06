import styles from './SettingsList.module.css';

import SettingsItem from '../SettingsItem/SettingsItem';

const settingsArr = [
  { name: 'Change tag', path: 'change_tag' },
  {
    name: 'Change password',
    path: 'change_password',
  },
];

function SettingsList() {
  return (
    <div className={styles.list}>
      {settingsArr.map(({ name, path }) => (
        <SettingsItem key={name} text={name} path={path} />
      ))}
    </div>
  );
}

export default SettingsList;
