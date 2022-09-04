import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { alpha, styled } from '@mui/material';
import { motion } from 'framer-motion';

const StyledButton = styled(MuiButton)<StyledButtonProps>(({ color, theme }) => ({
    color: theme.palette.common.white,
    fontWeight: '600',
    fontSize: '14px',
    paddingLeft: '16px !important',
    paddingRight: '16px !important',
    '&:hover': {
        boxShadow: `${alpha(theme.palette[color || 'primary'].main, 0.2)} 0px 8px 24px`,
        backgroundColor: theme.palette[color || 'primary'].light,
    },
}));

interface StyledButtonProps extends ButtonProps {
    color: 'primary' | 'secondary';
    component: any;
}

const Button = (props: ButtonProps) => {
    const { children, size = 'large' } = props;
    return (
        <StyledButton
            // @ts-ignore
            whileHover={{ scale: 1.02 }}
            // @ts-ignore
            whileTap={{ scale: 0.98 }}
            component={motion.button}
            size={size}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
