import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const CircularRatingWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    display: 'inline-flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50%',
    padding: '2px',
}));

export const RatingTypographyWrapper = styled(Box)<BoxProps>(() => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
