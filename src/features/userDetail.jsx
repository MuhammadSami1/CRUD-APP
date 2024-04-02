import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const URL = "https://66068985be53febb857e1c38.mockapi.io/crud";

// Create Action
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

// Read Action
export const showUser = createAsyncThunk(
  "showUser",
  async (_, { rejectWithValue }) => {
    const response = await fetch(URL);
    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete Action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://66068985be53febb857e1c38.mockapi.io/crud/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Edit User
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://66068985be53febb857e1c38.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

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
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Create Action
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

    // Show User
    builder
      .addCase(createAction(showUser.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(showUser.fulfilled), (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(createAction(showUser.rejected), (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });

    // Delete User
    builder
      .addCase(createAction(deleteUser.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(deleteUser.fulfilled), (state, action) => {
        state.loading = false;

        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((e) => e.id !== id);
        }
      })
      .addCase(createAction(deleteUser.rejected), (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });

    // Edit User
    builder
      .addCase(createAction(updateUser.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(updateUser.fulfilled), (state, action) => {
        state.loading = false;
        state.users = state.users.map((e) =>
          e.id === action.payload.id ? action.payload : e
        );
      })
      .addCase(createAction(updateUser.rejected), (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
