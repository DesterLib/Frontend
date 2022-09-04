import { styled } from '@mui/material';
import MuiIcon, { IconProps } from '@mui/material/Icon';
import React from 'react';

interface StyledIconProps extends IconProps {
    name: string;
    fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
}

const Icon = (props: StyledIconProps) => {
    const { name } = props;
    return (
        <MuiIcon baseClassName='material-symbols-rounded' {...props}>
            {name}
        </MuiIcon>
    );
};

export default Icon;
