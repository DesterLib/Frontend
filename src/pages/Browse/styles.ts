import styled from '@emotion/styled';
import Box, { BoxProps } from '@mui/system/Box';

export const MainContainer = styled(Box)<BoxProps>(() => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
}));
