import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const DSpacer = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    height: '5px',
    width: '5px',
    margin: '8px',
}));
