import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateTag } from '../../utils/generateTag';
import { UserRequests } from '../../services/UserRequests';
import { ProfileRequests } from '../../services/ProfileRequests';
import { postsApi } from '../postsApi';

export const googleAuth = createAsyncThunk(
  'user/googleAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await UserRequests.googleAuth();
      const loggedUser = await UserRequests.getUserById(data.user.uid);
      const loggedUserData = loggedUser.data();

      return loggedUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (registerData, { rejectWithValue }) => {
    try {
      const { user } = await UserRequests.signUpUserWithEmail({
        email: registerData.email,
        password: registerData.password,
      });
      const userData = {
        ...registerData,
        uid: user.uid,
        tag: generateTag(),
      };
      await UserRequests.pushUserToDb(user.uid, userData);

      const newUser = await UserRequests.getUserById(user.uid);
      const newUserData = newUser.data();

      return newUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const data = await UserRequests.signInUserWithEmail(loginData);
      const loggedUser = await UserRequests.getUserById(data.user.uid);
      const loggedUserData = loggedUser.data();

      return loggedUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      await UserRequests.updateUserInfo(data);
      const user = await UserRequests.getUserById(data.uid);
      const updatedUserData = user.data();

      return updatedUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await UserRequests.signOutUser();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const targetUserId = await UserRequests.followUser(data);
      dispatch(postsApi.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]));
      return targetUserId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const targetUserId = await UserRequests.unfollowUser(data);
      dispatch(postsApi.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]));
      return targetUserId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleBookmarks = createAsyncThunk(
  'user/toggleBookmarks',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ProfileRequests.toggleBookmarks(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllBookmarks = createAsyncThunk(
  'user/deleteAllBookmarks',
  async (data, { rejectWithValue }) => {
    try {
      await ProfileRequests.deleteAllBookmarks(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
