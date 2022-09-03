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
            main: '#6446FF',
            light: '#8D74FF',
            dark: '#4B33DB',
        },
        background: {
            paper: 'hsl(190, 50%, 12%)',
            default: 'hsl(190, 50%, 8%)',
        },
    },
    ...baseTheme,
});

export default darkTheme;
