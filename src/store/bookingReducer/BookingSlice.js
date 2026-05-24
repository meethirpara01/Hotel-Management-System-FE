import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [],
        loading: true,
        error: null
    },
    reducers: {
        setRoom: (state, action) => {
            state.rooms = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
});

export const { setRoom, setLoading, setError } = bookingSlice.actions;
export default bookingSlice.reducer;