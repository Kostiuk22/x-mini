import { useEffect, useState } from 'react';
import { searchUser } from '../utils/searchUsers';

export const useSearchUser = (searchText) => {
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchUserFn = async () => {
      if (!searchText.trim()) {
        setResult([]);
        return;
      }
      setIsSearching(true);

      const data = await searchUser(searchText);
      setResult(data);
      setIsSearching(false);
    };
    const debounceSearch = setTimeout(searchUserFn, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchText]);

  return [result, isSearching];
};
