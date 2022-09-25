import { Theme } from '@mui/material';

const baseTheme = {
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: '"Rubik", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme: Theme) => `
            ::-webkit-scrollbar {
                display: none;
            }
            .slick-dots {
                left: 0;
                bottom: 0;
                height: 100%;
                width: 100%;
                display: flex !important;
                justify-content: center;
                align-items: end;
                flex-direction: column;
                pointer-events: none;
            }
            @media only screen and (max-width: 600px) {
                .slick-dots {
                    
                }
            }
            .slick-dots li {
                width: 100px;
                height: auto;
                margin: 10px;
                transition: all 0.1s ease;
            }
            .slick-dots li.slick-active {
                width: 140px;
            }
          `,
        },
    },
};

export default baseTheme;
