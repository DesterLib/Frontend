import { CssBaseline } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import darkTheme from '../src/main/theme/darkTheme';
import lightTheme from '../src/main/theme/lightTheme';

const ThemeBlock = styled('div')(({ theme: { palette } }) => ({
    color: 'darkslategray',
    background: palette.background.default,
    padding: '1rem',
    height: '100%',
    width: '100%',
    borderRadius: '5px',
}));

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Theme for the components',
        defaultValue: 'light',
        toolbar: {
            icon: 'circlehollow',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'light' },
                { value: 'dark', icon: 'circle', title: 'dark' },
            ],
            showName: true,
        },
    },
};

export const decorators = [
    (StoryFn: any, context: any) => {
        const theme = context.parameters.theme || context.globals.theme;
        const storyTheme = theme === 'light' ? lightTheme : darkTheme;

        switch (theme) {
            default: {
                return (
                    <MemoryRouter initialEntries={['/']}>
                        <ThemeProvider theme={storyTheme}>
                            <CssBaseline />
                            <ThemeBlock>
                                <StoryFn />
                            </ThemeBlock>
                        </ThemeProvider>
                    </MemoryRouter>
                );
            }
        }
    },
];
