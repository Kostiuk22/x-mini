import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRequests } from '@services/UserRequests';
import { useDispatch } from 'react-redux';
import { setUser } from '@store/user/slices';

export const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
        if (isInitialAuthCheck.current && location.pathname === '/auth') {
          navigate('/home');
        }
        isInitialAuthCheck.current = false;
      } else {
        if (location.pathname !== '/auth') {
          navigate('/auth');
        }
        isInitialAuthCheck.current = true;
      }
    });

    return () => {
      authCheck();
    };
  }, [auth, navigate, dispatch, location]);
};
