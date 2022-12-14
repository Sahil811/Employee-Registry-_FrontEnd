import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import fetchUtility from '../fetchUtility';
import { SERVER_URL } from '../../web/constants';

const fileUploadHeader ={ 
  "Content-Type": "multipart/form-data"
}

export const employeeListActionCreator = createAsyncThunk(
  "employee/List",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.EMPLOYEE_LIST}`,
        payload
      );
    return data;
  }
);

export const employeeUpdateActionCreator = createAsyncThunk(
  "employee/update",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.EMPLOYEE_UPDATE}`,
        payload
      );
    return data;
  }
);

export const employeeDeleteActionCreator = createAsyncThunk(
  "employee/delete",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.EMPLOYEE_DELETE}`,
        payload
      );
    return data;
  }
);

export const employeeImportActionCreator = createAsyncThunk(
  "employee/import",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.EMPLOYEE_IMPORT}`,
        payload,
        fileUploadHeader
      );
    return data;
  }
);

export const employeeDetailsActionCreator = createAsyncThunk(
  "employee/details",
  async (payload) => {
    const { data } = await fetchUtility(
        'post',
        `${SERVER_URL.EMPLOYEE_DETAILS}`,
        payload
      );
    return data;
  }
);


const isPendingAction = isPending(employeeListActionCreator, employeeUpdateActionCreator, employeeDeleteActionCreator, employeeImportActionCreator, employeeDetailsActionCreator );

export const  employeeSlice = createSlice({
  name: "employee",
  initialState: {
    list: [],
    profile: null,
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
    builder.addCase(employeeListActionCreator.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action?.payload?.data?.list 
    });
    builder.addCase(employeeListActionCreator.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(employeeUpdateActionCreator.fulfilled, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload
    });
    builder.addCase(employeeUpdateActionCreator.rejected, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload;
    });
    builder.addCase(employeeDeleteActionCreator.fulfilled, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload
    });
    builder.addCase(employeeDeleteActionCreator.rejected, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload;
    });
    builder.addCase(employeeImportActionCreator.fulfilled, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload
    });
    builder.addCase(employeeImportActionCreator.rejected, (state, action) => {
      state.loading = false;
      state.messageData = action?.payload;
    });
    builder.addCase(employeeDetailsActionCreator.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action?.payload?.data
    });
    builder.addCase(employeeDetailsActionCreator.rejected, (state, action) => {
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

export const { clearMessage: clearMessageEmployeeActionCreator } = employeeSlice.actions;

export default employeeSlice.reducer;