import { alpha, styled } from '@mui/material';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import React from 'react';

interface StyledIconButtonProps extends IconButtonProps {
    color: 'primary' | 'secondary' | 'error' | 'info';
    blackText?: boolean;
}

const StyledIconButton = styled(MuiIconButton, {
    shouldForwardProp: (prop) => prop !== 'blackText',
})<StyledIconButtonProps>(({ theme, color, blackText }) => ({
    backgroundColor: theme.palette[color || 'primary'].main,
    color: blackText ? theme.palette.common.black : theme.palette.common.white,
    transition: 'box-shadow 0.2s ease',
    borderRadius: '10px',
    '&:hover': {
        backgroundColor: theme.palette[color || 'primary'].light,
        // boxShadow:
        //     color === 'secondary'
        //         ? `${alpha(theme.palette[color || 'primary'].main, 0.4)} 0px 8px 24px`
        //         : `${theme.palette[color || 'primary'].main} 0px 8px 24px`,
        boxShadow: `${alpha(theme.palette[color || 'primary'].main, 0.4)} 0px 8px 24px`,
    },
}));

const IconButton = (props: StyledIconButtonProps) => {
    const { color = 'primary', children, blackText = false } = props;
    return (
        <StyledIconButton
            {...props}
            color={color}
            // @ts-ignore
            whileHover={{ scale: 1.02 }}
            // @ts-ignore
            whileTap={{ scale: 0.98 }}
            component={motion.button}
            centerRipple={false}
            blackText={blackText}
        >
            {children}
        </StyledIconButton>
    );
};

export default IconButton;
