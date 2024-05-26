import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Make HTTP request
export const userAuthorLoginThunk = createAsyncThunk(
  'user-author-login',
  async (userCredObj, thunkApi) => {
    try {
      let res;
      if (userCredObj.role === 'user') {
        res = await axios.post('http://localhost:4000/user-api/login', userCredObj);
      } else if (userCredObj.role === 'author') {
        res = await axios.post('http://localhost:4000/author-api/login', userCredObj);
      }

      if (res.data.message === "Login success") {
        // Store token in local storage
        localStorage.setItem('token', res.data.token);
        // Return data
        return res.data;
      } else {
        return thunkApi.rejectWithValue(res.data.message);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response ? err.response.data.message : err.message);
    }
  }
);

export const userAuthorSlice = createSlice({
  name: "user-author-login",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccured: false,
    errMsg: '',
    role : ''
  },
  reducers: {
    resetState: (state) => {
      state.isPending = false;
      state.loginUserStatus = false;
      state.currentUser = {};
      state.errorOccured = false;
      state.errMsg = '';
      state.role = {};
    }
  },
  extraReducers: builder => {
    builder
      .addCase(userAuthorLoginThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.name;
        state.loginUserStatus = true;
        state.errMsg = '';
        state.errorOccured = false;
        state.role = action.payload.role
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload;
        state.errorOccured = true;
        state.role = ''
      });
  }
});

// Export action creator
export const { resetState } = userAuthorSlice.actions;
// Export reducer
export default userAuthorSlice.reducer;
