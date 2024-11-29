import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRequests } from '../services/UserRequests';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user/slices';

export const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isInitialAuthCheck = useRef(true);

  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const authUserData = await UserRequests.getUserById(user.uid);
          const data = authUserData.data();
          dispatch(setUser(data));
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
        if (isInitialAuthCheck.current) {
          navigate('/x.com/home');
          isInitialAuthCheck.current = false;
        }
      } else {
        navigate('/auth');
        isInitialAuthCheck.current = true;
      }
    });

    return () => {
      authCheck();
    };
  }, [auth, navigate, dispatch]);
};
