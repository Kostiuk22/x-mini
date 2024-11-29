import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatId: null,
  receiver: {},
  userChats: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatId: (state, { payload }) => {
      state.chatId = payload;
    },
    setReceiver: (state, { payload }) => {
      state.receiver = payload;
    },

    setUserChats: (state, { payload }) => {
      state.userChats = payload;
    },
    resetChats: (state) => {
      state.chatId = null;
      state.receiver = {};
      state.userChats = [];
    },
  },
});

export const { setChatId, setReceiver, setUserChats, resetChats } =
  chatsSlice.actions;

export default chatsSlice.reducer;
