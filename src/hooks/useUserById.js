import { useEffect, useState } from 'react';
import { UserRequests } from '../services/UserRequests';

export const useUserById = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setIsLoading(true);

      try {
        const userDoc = await UserRequests.getUserById(userId);
        setUser(userDoc.data());
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading, error };
};
