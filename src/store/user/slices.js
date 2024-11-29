import { createSlice } from '@reduxjs/toolkit';
import {
  deleteAllBookmarks,
  followUser,
  googleAuth,
  login,
  logout,
  register,
  toggleBookmarks,
  unfollowUser,
  updateProfile,
} from './thunks';

const initialState = {
  userProfile: {},
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userProfile = action.payload;
      state.isAuthenticated = true;
    },
    setNewTag: (state, action) => {
      state.userProfile.tag = action.payload;
    },
    removeUser: (state) => {
      state.userProfile = {};
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userProfile = payload;
        state.isAuthenticated = true;
      })
      .addCase(googleAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userProfile = payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      });

    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userProfile = payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        //state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        //state.isLoading = false;
        state.userProfile = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        //state.isLoading = false;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.userProfile = {};
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });

    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.userProfile.following.push(payload);
    });

    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      //state.isLoading = false;
      state.userProfile.following = state.userProfile.following.filter(
        (el) => el !== payload
      );
    });

    builder.addCase(toggleBookmarks.fulfilled, (state, { payload }) => {
      if (payload.status === 'added') {
        state.userProfile.bookmarks.push(payload.postId);
      } else if (payload.status === 'deleted') {
        const filteredArr = state.userProfile.bookmarks.filter(
          (el) => el != payload.postId
        );

        state.userProfile.bookmarks = filteredArr;
      }
    });

    builder.addCase(deleteAllBookmarks.fulfilled, (state) => {
      state.userProfile.bookmarks = [];
    });
  },
});

export const { setUser, removeUser, setLoading, setNewTag } = userSlice.actions;

export default userSlice.reducer;
