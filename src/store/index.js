import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slices';
import chatsReducer from './messages/slices';
import { postsApi } from './postsApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;
