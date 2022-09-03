import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './functions/themeSlice';

const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
    },
});

export default store;