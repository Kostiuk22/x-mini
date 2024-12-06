import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './postsApi';
import userReducer from './user/slices';
import chatsReducer from './messages/slices';

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
