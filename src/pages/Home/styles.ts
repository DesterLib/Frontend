import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)<BoxProps>(() => ({}));

export const MainWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    marginTop: 'calc(60px + 20px)',
    marginBottom: '100px',
    [theme.breakpoints.down('md')]: {
        marginTop: '60px',
    },
}));
