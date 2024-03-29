import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const URL = "https://66068985be53febb857e1c38.mockapi.io/crud";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction(createUser.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(createUser.fulfilled), (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createAction(createUser.rejected), (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export default userDetail.reducer;
