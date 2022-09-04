import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalItems: 0,
};

export const navbarSlice = createSlice({
    name: 'navbarItems',
    initialState,
    reducers: {},
});

export default navbarSlice.reducer;
