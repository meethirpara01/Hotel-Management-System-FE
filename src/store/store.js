import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer/authSlice.js"
import bookingReducer from "./bookingReducer/BookingSlice.js"
import roomReducer from "./roomReducer/roomSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        bookings: bookingReducer,
        room: roomReducer,
    }
});