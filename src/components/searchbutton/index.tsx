import { Box, styled, Typography, InputBase, ButtonBase, alpha } from '@mui/material';
import Icon from 'components/icon';
import { AnimatePresence, motion } from 'framer-motion';
import { demodata } from '../../../data';
import React from 'react';
import ReactHotkeys from 'react-hot-keys';

const StyledSearchField = styled(InputBase)(({ theme }) => ({
    width: '100%',
    marginRight: '80px',
    '& .MuiInputBase-input': {
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        fontSize: 16,
        padding: '10px 12px',
        height: 'fit-content',
        width: 'inherit',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
        '&:hover': {
            boxShadow: `${alpha(theme.palette.background.default, 1)} 0px 8px 24px`,
        },
        '&:focus': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: `${alpha(theme.palette.background.default, 1)} 0px 8px 24px`,
        },
    },
})) as typeof InputBase;

const StyledSearchIcon = styled(Icon)({
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '10px',
});

const StyledSearchButtonBadge = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    padding: '5px 10px',
    margin: '5px',
    top: '0',
    bottom: '0',
    right: '0',
    borderRadius: theme.shape.borderRadius,
    fontSize: '14px',
}));

const StyledSearchList = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: '5px',
})) as typeof Box;

const StyledSearchListItem = styled(ButtonBase)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    textAlign: 'left',
    boxSizing: 'border-box',
    alignItems: 'start',
    justifyContent: 'flex-start',
    borderRadius: (theme.shape.borderRadius as number) * 0.5,
    padding: '5px',
    '&:hover': {
        width: '100%',
        backgroundColor: theme.palette.background.default,
    },
})) as typeof ButtonBase;

const StyledSearchListItemPoster = styled('img')(({ theme }) => ({
    maxWidth: '50px',
    marginRight: '10px',
    borderRadius: (theme.shape.borderRadius as number) * 0.5,
    width: '100%',
}));

type Props = {};

const SearchButton = (props: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const variantsParent = {
        open: { y: 100, scale: 1.4, transition: { type: 'spring', bounce: 0.5 } },
        closed: { y: 0, scale: 1, transition: { type: 'spring', bounce: 0.5 } },
    };
    const onKeyDown = () => {
        setIsOpen(true);
    };
    return (
        <ReactHotkeys keyName='command+k' onKeyDown={onKeyDown}>
            <Box
                component={motion.div}
                animate={isOpen ? 'open' : 'closed'}
                variants={variantsParent}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                sx={{
                    zIndex: '1250',
                    width: '400px',
                    maxWidth: '450px',
                    marginLeft: '20px',
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <StyledSearchField
                        placeholder={isOpen ? 'Search...' : ''}
                        id='outlined-basic'
                        autoComplete='off'
                    />
                    {!isOpen && <StyledSearchIcon name='search' />}
                    <StyledSearchButtonBadge
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {isOpen ? (
                            <>esc</>
                        ) : (
                            <>
                                <Icon name='keyboard_command_key' fontSize='inherit' />K
                            </>
                        )}
                    </StyledSearchButtonBadge>
                </Box>
                <AnimatePresence>
                    {isOpen && (
                        <StyledSearchList
                            component={motion.div}
                            transition={{ type: 'spring', stiffness: 100 }}
                            animate={{ y: 10, opacity: 1 }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                        >
                            {demodata.slice(0, 4).map((item) => (
                                <StyledSearchListItem disableRipple component={motion.button}>
                                    <StyledSearchListItemPoster
                                        src={`https://www.themoviedb.org/t/p/w500${item.poster_path}`}
                                    />
                                    <Box>
                                        <Typography variant='body2'>
                                            {item.name || item.title}
                                        </Typography>
                                        <Typography variant='caption'>
                                            {item.original_name || item.original_title}
                                        </Typography>
                                    </Box>
                                </StyledSearchListItem>
                            ))}
                        </StyledSearchList>
                    )}
                </AnimatePresence>
            </Box>
        </ReactHotkeys>
    );
};

export default SearchButton;
