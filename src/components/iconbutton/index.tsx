import { alpha, styled, ButtonBase } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface StyledIconButtonProps {
    blackText?: boolean;
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

const StyledIconButton = styled(ButtonBase, {
    shouldForwardProp: (prop) => prop !== 'blackText',
})<StyledIconButtonProps>(({ theme, color, blackText }) => ({
    color: blackText ? theme.palette.common.black : theme.palette.common.white,
    borderRadius: '10px',
    padding: '8px',
    backgroundColor: alpha(theme.palette['secondary'].main, 0.8),
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    '&:hover': {
        boxShadow: `${alpha(theme.palette[color || 'primary'].main, 0.4)} 0px 8px 24px`,
        backgroundColor: alpha(theme.palette[color || 'primary'].light, 1),
    },
})) as typeof ButtonBase;

const IconButton = (props: StyledIconButtonProps) => {
    const { color = 'primary', children, blackText = false } = props;
    return (
        <StyledIconButton
            color={color}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            centerRipple={false}
            blackText={blackText}
            component={motion.button}
            {...props}
        >
            {children}
        </StyledIconButton>
    );
};

export default IconButton;
