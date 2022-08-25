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
            main: '#7154FF',
            light: '#967EFF',
            dark: '#553DDB',
        },
        background: {
            paper: '#ffffff',
            default: '#f1f1f1',
        },
    },
    ...baseTheme,
});

export default lightTheme;
