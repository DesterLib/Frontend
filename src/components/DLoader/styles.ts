import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MainWrapper = styled(Box)<BoxProps>(() => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));
