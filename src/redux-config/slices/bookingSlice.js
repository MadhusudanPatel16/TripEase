import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripId: null,
  userId: null,
  bookings: [], // ✅ Bookings ko store karne ke liye
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      state.tripId = action.payload.tripId;
      state.userId = action.payload.userId;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload; // ✅ Bookings ko Redux me save karo
    },
    clearBookings: (state) => {
      state.bookings = []; // ✅ Logout hone pe bookings hata do
    },
  },
});

export const { setBookingDetails, setBookings, clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
