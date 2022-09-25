import React from 'react';
import MuiChip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material';

const StyledChip = styled(MuiChip)<StyledChipProps>(({ color, theme }) => ({
    padding: '0px',
    borderRadius: '5px',
    height: 'fit-content',
    margin: '10px 0px',
    color: theme.palette.common.white,
    fontWeight: '600',
    backgroundColor: theme.palette[color || 'primary'].light,
    textTransform: 'uppercase',
}));

interface StyledChipProps extends ChipProps {
    color: 'primary' | 'secondary' | 'info' | 'error';
}

const Chip = (props: StyledChipProps) => {
    const { children, color } = props;
    return (
        <StyledChip {...props} color={color}>
            {children}
        </StyledChip>
    );
};

export default Chip;
