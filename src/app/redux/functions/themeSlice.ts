import { createSlice } from '@reduxjs/toolkit';

const data = localStorage.getItem('darkMode');

const persistedData = data ? JSON.parse(data) : {};

const initialState = {
    darkMode: persistedData,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export const asyncToggleTheme = () => (dispatch: any) => {
    const isDarkMode = data ? JSON.parse(data) : {};
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
