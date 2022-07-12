import React from 'react';

import { DButtonEndIcon, DButtonPrimary, DButtonSecondary, DButtonStartIcon } from './styles';

// function generateTextColor(hexcolor: any) {
//     hexcolor = hexcolor.replace('#', '');
//     var r = parseInt(hexcolor.substr(0, 2), 16);
//     var g = parseInt(hexcolor.substr(2, 2), 16);
//     var b = parseInt(hexcolor.substr(4, 2), 16);
//     var yiq = (r * 299 + g * 587 + b * 114) / 1000;
//     return yiq >= 128 ? 'black' : 'white';
// }

const DButton = ({
    startIcon,
    endIcon,
    color,
    children,
    variant,
    onClick,
    disabled,
    fullwidth,
    sx,
}: any) => {
    return (
        <>
            {color === 'primary' || color === undefined ? (
                <DButtonPrimary fullwidth={fullwidth} disabled={disabled} onClick={onClick} sx={sx}>
                    {startIcon && (
                        <DButtonStartIcon
                            className='DButton-startIcon'
                            color={color}
                            variant={variant}
                        >
                            {startIcon}
                        </DButtonStartIcon>
                    )}
                    {children}
                    {endIcon && (
                        <DButtonEndIcon className='DButton-endIcon' color={color} variant={variant}>
                            {endIcon}
                        </DButtonEndIcon>
                    )}
                </DButtonPrimary>
            ) : null}
            {color === 'secondary' ? (
                <DButtonSecondary
                    fullwidth={fullwidth}
                    disabled={disabled}
                    color={color}
                    onClick={onClick}
                    sx={sx}
                >
                    {startIcon && (
                        <DButtonStartIcon
                            className='DButton-startIcon'
                            color={color}
                            variant={variant}
                        >
                            {startIcon}
                        </DButtonStartIcon>
                    )}
                    {children}
                    {endIcon && (
                        <DButtonEndIcon className='DButton-endIcon' color={color} variant={variant}>
                            {endIcon}
                        </DButtonEndIcon>
                    )}
                </DButtonSecondary>
            ) : null}
            {color === 'warning' ? (
                <DButtonSecondary
                    fullwidth={fullwidth}
                    disabled={disabled}
                    color={color}
                    onClick={onClick}
                    sx={sx}
                >
                    {startIcon && (
                        <DButtonStartIcon
                            className='DButton-startIcon'
                            color={color}
                            variant={variant}
                        >
                            {startIcon}
                        </DButtonStartIcon>
                    )}
                    {children}
                    {endIcon && (
                        <DButtonEndIcon className='DButton-endIcon' color={color} variant={variant}>
                            {endIcon}
                        </DButtonEndIcon>
                    )}
                </DButtonSecondary>
            ) : null}
            {color === 'danger' ? (
                <DButtonSecondary
                    fullwidth={fullwidth}
                    disabled={disabled}
                    color={color}
                    onClick={onClick}
                    sx={sx}
                >
                    {startIcon && (
                        <DButtonStartIcon
                            className='DButton-startIcon'
                            color={color}
                            variant={variant}
                        >
                            {startIcon}
                        </DButtonStartIcon>
                    )}
                    {children}
                    {endIcon && (
                        <DButtonEndIcon className='DButton-endIcon' color={color} variant={variant}>
                            {endIcon}
                        </DButtonEndIcon>
                    )}
                </DButtonSecondary>
            ) : null}
        </>
    );
};

export default DButton;
