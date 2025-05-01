import { createSlice } from "@reduxjs/toolkit";

const tripStore = createSlice({
  name: "tripStore",
  initialState: {
    tripId: null, // ✅ Trip ID store karega
  },
  reducers: {
    setTripId: (state, action) => {
      state.tripId = action.payload;
    },
    clearTripId: (state) => {
      state.tripId = null;
    },
  },
});

export const { setTripId, clearTripId } = tripStore.actions;
export default tripStore.reducer;
