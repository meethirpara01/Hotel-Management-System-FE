import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
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

export const { setRoom, setLoading, setError } = roomSlice.actions;
export default roomSlice.reducer;