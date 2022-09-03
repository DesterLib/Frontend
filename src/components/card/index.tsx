import { Box, Chip, Typography, styled, alpha } from '@mui/material';
import React from 'react';

import Icon from 'components/icon';
import Modal from 'components/modal';
import IconButton from 'components/iconbutton';

const StyledCard = styled(Box)({
    maxWidth: '240px',
    width: 'fit-content',
    height: 'auto',
    transition: '0.2s ease',
    pointerEvents: 'auto',
    boxSizing: 'border-box',
    '&:hover div .actionButtons div .playButton': {
        opacity: '1',
    },
    '&:hover div .cardImage': {
        opacity: '0.2',
    },
});

const StyledCardImage = styled('img')({
    display: 'block',
    width: '100%',
    height: 'auto',
    transition: '0.2s ease',
    opacity: '1',
});

const DataPills = styled(Box)({});

const DataPill = styled(Chip)<{ color: 'primary' | 'secondary' | 'warning' }>(
    ({ theme, color }) => ({
        transition: '0.1s ease',
        color: theme.palette[color].light,
        fontWeight: '700',
        backgroundColor: `${alpha(theme.palette[color].dark, 0.2)}`,
        backdropFilter: 'contrast(90%) brightness(10%)',
    }),
);

const PlayButton = styled(IconButton)(({ theme }) => ({
    transition: '0.1s ease',
    padding: '10px',
    opacity: '0',
    '&:hover': {
        backdropFilter: 'blur(10px)',
    },
    '& span': {
        fontSize: '40px',
    },
}));

const ActionButtons = styled(Box)({
    transition: '0.1s ease',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

const StyledCardTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    padding: '5px',
}));

type CardProps = {};

const Card = (props: CardProps) => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleClickOpenModal = () => {
        setOpenModal(true);
    };
    return (
        <StyledCard color='warning'>
            <Box
                sx={{
                    position: 'relative',
                    height: 'fit-content',
                    overflow: 'hidden',
                    borderRadius: '10px',
                }}
            >
                <StyledCardImage
                    className='cardImage'
                    src='https://www.themoviedb.org/t/p/w1280/nJUHX3XL1jMkk8honUZnUmudFb9.jpg'
                    alt='green iguana'
                />
                <ActionButtons className='actionButtons'>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '5px',
                            width: '100%',
                        }}
                    >
                        <DataPill className='dataPill' color='warning' label='S1 E1' />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                            width: '100%',
                        }}
                    >
                        <PlayButton className='playButton' color='primary'>
                            <Icon name='play_arrow' />
                        </PlayButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                            width: '100%',
                        }}
                    >
                        <IconButton color='error'>
                            <Icon name='favorite' />
                        </IconButton>
                        <IconButton color='secondary' onClick={handleClickOpenModal}>
                            <Icon name='more_vert' />
                        </IconButton>
                    </Box>
                </ActionButtons>
            </Box>
            <StyledCardTitle variant='body1'>Lizard</StyledCardTitle>
            <Modal openModal={openModal} setOpenModal={setOpenModal} />
        </StyledCard>
    );
};

export default Card;
