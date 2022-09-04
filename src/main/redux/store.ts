import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './functions/themeSlice';
import navbarReducer from './functions/navbarSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        navbar: navbarReducer,
    },
});

export default store;
