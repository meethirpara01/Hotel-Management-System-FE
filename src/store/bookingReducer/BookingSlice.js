import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        userBookings: [],
        loading: true,
        error: null
    },
    reducers: {
        setBookings: (state, action) => {
            state.userBookings = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
});

export const { setBookings, setLoading, setError } = bookingSlice.actions;
export default bookingSlice.reducer;