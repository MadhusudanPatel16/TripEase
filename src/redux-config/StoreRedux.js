import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import authReducer from "./slices/authSlice"
import tripReducer from "./slices/tripSlice"
import adminAuthReducer from "./slices/adminAuthSlice"
import tripStoreReducer from "./slices/tripStore"
import bookingReducer from "./slices/bookingSlice"
const store = configureStore({
    reducer:{
        user   : UserSlice,
        auth: authReducer,
        trip: tripReducer,
        adminAuth: adminAuthReducer,
        tripStore: tripStoreReducer,
        booking: bookingReducer,



    }
});

export default store;