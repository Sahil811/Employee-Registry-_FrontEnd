import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import fetchUtility from '../fetchUtility';
import { SERVER_URL } from '../../web/constants';
import Cookies from "js-cookie";

export const userLoginActionCreator = createAsyncThunk(
  "user/login",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.USER_LOGIN}`,
        payload
      );
    return data;
  }
);

// export const userProfileUpdateActionCreator = createAsyncThunk(
//   "users/profile",
//   async ({ name, email, password }) => {
//     const { data } = await axios.put(
//       "/api/users/profile",
//       {
//         name,
//         email,
//         password,
//       },
//       { headers: { authorization: `Bearer ${userInfo.token}` } }
//     );
//     return data;
//   }
// );

export const userRegisterActionCreator = createAsyncThunk(
  "users/register",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.USER_SIGNUP}`,
        payload
      );
    return data;
  }
);

const isPendingAction = isPending(userRegisterActionCreator);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
    loading: null,
    error: null,
    messageData: null
  },
  reducers: {
    logout: {
      reducer: () => {
        Cookies.remove("userInfo");
        Cookies.remove("token");
        return null;
      },
    },
    clearMessage: {
        reducer: (state) => {
          state.messageData = null;
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginActionCreator.fulfilled, (state, action) => {
        state.loading = false;
        state.messageData = action?.payload
        state.userInfo = action?.payload?.data?.user
        if (
          action?.payload.code === 100
        ) {
          Cookies.set("userInfo", JSON.stringify(action?.payload?.data?.user));
          Cookies.set("token", JSON.stringify(action?.payload?.data?.accessToken));
        }
      });
      builder.addCase(userLoginActionCreator.rejected, (state, action) => {
        state.loading = false;
        state.messageData = action?.payload;
      });
    builder.addCase(userRegisterActionCreator.fulfilled, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload
    });
    builder.addCase(userRegisterActionCreator.rejected, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload;
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  }
});

export const { logout: logoutActionCreator, clearMessage: clearMessageUserActionCreator } = userSlice.actions;

export default userSlice.reducer;