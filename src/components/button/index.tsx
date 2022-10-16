import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { alpha, styled } from '@mui/material';
import { motion } from 'framer-motion';

interface StyledButtonProps extends ButtonProps {
    color?: 'primary' | 'secondary';
}

const StyledButton = styled(MuiButton)<StyledButtonProps>(({ color, theme }) => ({
    color: theme.palette.common.white,
    fontWeight: '600',
    fontSize: '14px',
    paddingLeft: '16px !important',
    paddingRight: '16px !important',
    backgroundColor: alpha(theme.palette[color || 'primary'].main, 0.8),
    backdropFilter: 'blur(10px)',
    boxShadow: `${alpha(theme.palette[color || 'primary'].main, 0.2)} 0px 8px 24px`,
    '&:hover': {
        boxShadow: `${alpha(theme.palette[color || 'primary'].light, 0.2)} 0px 8px 24px`,
        backgroundColor: alpha(theme.palette[color || 'primary'].light, 1),
    },
})) as typeof MuiButton;

const MotionButton = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <motion.button innerRef={ref as any} {...props} />
));

const Button: React.FC<StyledButtonProps> = (props) => {
    return (
        <StyledButton
            component={MotionButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        />
    );
};

export default Button;
