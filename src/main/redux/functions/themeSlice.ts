import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkMode: JSON.parse(localStorage.getItem('darkMode') || ''),
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
    const isDarkMode = !!JSON.parse(localStorage.getItem('darkMode') || '');
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
