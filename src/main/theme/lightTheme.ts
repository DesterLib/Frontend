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
            main: '#2F4D61',
            light: '#628BA0',
            dark: '#223C53',
        },
        info: {
            main: '#286BFC',
            light: '#5D95FD',
            dark: '#1D52D8',
        },
        success: {
            main: '#6AEA54',
            light: '#98F27D',
            dark: '#47C93D',
        },
        text: {
            primary: 'rgba(70, 94, 118, 0.87)',
            secondary: 'rgba(101, 124, 141, 0.6)',
            disabled: 'rgba(139, 155, 164, 0.38)',
        },
        background: {
            paper: '#ffffff',
            default: '#f1f1f1',
        },
    },
    ...baseTheme,
});

export default lightTheme;
