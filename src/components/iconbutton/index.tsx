import { alpha, styled } from '@mui/material';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { motion } from 'framer-motion';
import React from 'react';

interface StyledIconButtonProps extends ButtonBaseProps {
    blackText?: boolean;
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

const MotionButton = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <motion.button innerRef={ref as any} {...props} />
));

const IconButton: React.FC<StyledIconButtonProps> = (props) => {
    const { color = 'primary', children, blackText = false } = props;
    return (
        <StyledIconButton
            color={color}
            centerRipple={false}
            blackText={blackText}
            component={MotionButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </StyledIconButton>
    );
};

export default IconButton;
