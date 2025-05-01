import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // For success notifications

// Async function to book a trip
export const bookTrip = createAsyncThunk(
  "trip/bookTrip",
  async ({ userId, tripId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/book-trip", {
        userId,
        tripId,
      });
      toast.success("Booking Successful! 🎉"); // Show success message
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async function to fetch booked trips for a user
export const fetchUserTrips = createAsyncThunk(
  "trip/fetchUserTrips",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user-trips/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    bookedTrips: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.bookedTrips.push(action.payload);
      })
      .addCase(bookTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        state.bookedTrips = action.payload;
      });
  },
});

export default tripSlice.reducer;
