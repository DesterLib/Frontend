import { createTheme } from '@mui/material';

import baseTheme from './baseTheme';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#14DCA0',
            light: '#4AEAAA',
            dark: '#0EBD99',
        },
        secondary: {
            main: '#161616',
            light: '#111111',
            dark: '#0b0b0b',
        },
        background: {
            paper: '#ffffff',
            default: '#f1f1f1',
        },
    },
    ...baseTheme,
});

export default lightTheme;
