import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import fetchUtility from '../fetchUtility';
import { SERVER_URL } from '../../web/constants';
import Cookies from "js-cookie";

const userInfo = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : null;

// export const userLoginActionCreator = createAsyncThunk(
//   "user/login",
//   async ({ email, password }) => {
//     const { data } = await axios.post("/api/users/login", { email, password });
//     return data;
//   }
// );

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
        return null;
      },
    },
    clearMessage: {
        reducer: (state) => {
          state.messageData = null;
        }
    }
  },
//   extraReducers: {
//     // [userLoginActionCreator.pending]: (state, action) => {
//     //   state.status = "loading";
//     // },
//     // [userLoginActionCreator.fulfilled]: (state, action) => {
//     //   //state.status = "succeeded";
//     //   Cookies.set("userInfo", JSON.stringify(action.payload));
//     //   return action.payload;
//     // },
//     // [userLoginActionCreator.rejected]: (state, action) => {
//     //   state.status = "failed";
//     //   state.error = action.error.message;
//     // },

//     // [userProfileUpdateActionCreator.fulfilled]: (state, action) => {
//     //   Cookies.set("userInfo", JSON.stringify(action.payload));
//     //   return action.payload;
//     // },
//     [userRegisterActionCreator.fulfilled]: (state, action) => {
//       state.messageData =  action.payload;
//     },
//   },
  extraReducers: (builder) => {
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