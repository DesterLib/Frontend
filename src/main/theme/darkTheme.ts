import { createTheme } from '@mui/material';

import baseTheme from './baseTheme';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#14DCA0',
            light: '#4AEAAA',
            dark: '#0EBD99',
        },
        secondary: {
            main: '#2a414a',
            light: '#4e666e',
            dark: '#131f25',
        },
        info: {
            main: '#286BFC',
            light: '#5D95FD',
            dark: '#1D52D8',
        },
        success: {
            main: '#4AC94A',
            light: '#7EDE75',
            dark: '#36AC40',
        },
        text: {
            primary: 'rgba(222, 239, 246, 0.8)',
            secondary: 'rgba(231, 246, 250, 0.7)',
            disabled: 'rgba(240, 251, 253, 0.5)',
        },
        background: {
            paper: '#1b2528',
            default: '#0e181e',
        },
    },
    ...baseTheme,
});

export default darkTheme;
