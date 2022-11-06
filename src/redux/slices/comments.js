import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import fetchUtility from '../fetchUtility';
import { SERVER_URL } from '../../web/constants';

export const commentListActionCreator = createAsyncThunk(
  "comment/List",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.COMMENTS_LIST}`,
        payload
      );
    return data;
  }
);

export const commentCreateActionCreator = createAsyncThunk(
    "comment/Create",
    async (payload) => {
      const { data } = await fetchUtility(
          'post',
          `${SERVER_URL.COMMENTS_CREATE}`,
          payload
        );
      return data;
    }
  );

const isPendingAction = isPending(commentListActionCreator, commentCreateActionCreator);

export const  commentsSlice = createSlice({
  name: "employee",
  initialState: {
    list: [],
    loading: null,
    error: null,
    messageData: null
  },
  reducers: {
    clearMessage: {
        reducer: (state) => {
          state.messageData = null;
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(commentListActionCreator.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action?.payload?.data?.list 
    });
    builder.addCase(commentListActionCreator.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(commentCreateActionCreator.fulfilled, (state, action) => {
        state.loading = false;
        state.messageData = action?.payload
      });
    builder.addCase(commentCreateActionCreator.rejected, (state, action) => {
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

export const { clearMessage: clearMessageEmployeeActionCreator } = commentsSlice.actions;

export default commentsSlice.reducer;