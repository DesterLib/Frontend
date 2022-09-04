import { Box, styled, Typography, ButtonBase, alpha } from '@mui/material';
import Icon from 'components/icon';
import { motion } from 'framer-motion';
import React from 'react';

const StyledSearchButton = styled(ButtonBase)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    width: '100%',
    maxWidth: '400px',
    justifyContent: 'space-between',
    marginLeft: '20px',
    '&:hover': {
        boxShadow: `${alpha(theme.palette.background.default, 1)} 0px 8px 24px`,
    },
})) as typeof ButtonBase;

const StyledSearchButtonBadge = styled(Typography)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    padding: '5px 10px',
    borderRadius: theme.shape.borderRadius,
    fontSize: '14px',
}));

type Props = {};

const SearchButton = (props: Props) => {
    return (
        <StyledSearchButton
            component={motion.button}
            whileHover={{ scale: 1.011 }}
            whileTap={{ scale: 0.999 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon fontSize='small' sx={{ marginLeft: '10px' }} name='search' />
                <Typography sx={{ padding: '0px 20px' }}>Search...</Typography>
            </Box>
            <StyledSearchButtonBadge
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Icon name='keyboard_command_key' fontSize='inherit' />K
            </StyledSearchButtonBadge>
        </StyledSearchButton>
    );
};

export default SearchButton;
