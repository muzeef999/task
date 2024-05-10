import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loading: true,
  Followers: [],
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    try {
      const response = await axios.get("/api/users");
      return response.data; // Use response.data directly since axios automatically parses JSON
    } catch (error) {
      throw error;
    }
  }
);

export const updateQuality = createAsyncThunk(
  "user/updateQuality", // Corrected action type
  async ({ userId, followers }) => {
    try {
      const response = await axios.put(`/api/signin`, {
        userId,
        followers,
      });
      return response.data; // Return response.data to access it easily in reducers
    } catch (error) {
      toast.error("Failed to update quantity");
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user", // Corrected slice name
  initialState,
  reducers: {}, // You can add additional reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.Followers = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateQuality.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateQuality.fulfilled, (state, action) => {
        // Find the user in the state by their ID
        const userToUpdate = state.Followers.find(
          (user) => user._id === action.payload._id
        );
        // Update the followers count for the found user
        if (userToUpdate) {
          userToUpdate.followers = action.payload.followers;
        }
      })

      .addCase(updateQuality.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectTotalFollowers = (state) =>
  state.user.Followers.reduce((total, user) => total + user.followers, 0);

export default userSlice.reducer;
