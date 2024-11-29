import { useState } from 'react';
import SearchField from '../../components/ui/SearchField/SearchField';
import styles from './Explore.module.css';
import UserItem from '../../components/RightSide/WhoToFollow/UserItem/UserItem';
import { useSearchUser } from '../../hooks/useSearchUser';

function Explore() {
  const [searchText, setSearchText] = useState('');
  const [result, isSearching] = useSearchUser(searchText);

  return (
    <div className={styles.explore}>
      <header>
        <SearchField
          placeholderText="Search"
          variant="secondary"
          text={searchText}
          onChange={setSearchText}
        />
      </header>
      <h1>
        {result &&
          result.map((user) => <UserItem key={user.uid} user={user} />)}
      </h1>
    </div>
  );
}

export default Explore;
