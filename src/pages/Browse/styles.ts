import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: '30px 60px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 20px',
    },
}));
