import Box, { BoxProps } from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import DButton from '../DButton';

export const ShowMoreButton = styled(DButton)(() => ({
    padding: '5px 5px 5px 20px',
}));

export const ListWrapper = styled(Box)<BoxProps>(() => ({
    maxWidth: '900px',
    padding: '10px',
}));

export const ChipIndex = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: '#171E22',
    color: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    padding: '0px 5px',
    marginLeft: '10px',
    marginTop: '0px',
    border: '2px solid #33544A',
}));

export const Heading = styled(Typography)<TypographyProps>(() => ({
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
}));
