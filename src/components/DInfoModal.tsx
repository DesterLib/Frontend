import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_BACKDROP_QUALITY } from '../config';
import DButton from './DButton';

/*
interface ItemBackgroundProps {
  poster?: string;
  backdrop?: string;
  theme?: Theme;
}
*/

const InfoModal = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: alpha('#000000', 1),
        border: '0px',
    },
    '& .MuiDialog-container .MuiDialog-paper': {
        boxShadow: `0px 0px 0px 2px ${theme.palette.background.default}`,
        borderRadius: '10px',
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const InfoModalBackdrop = styled(Box)(() => ({
    width: '100%',
    paddingBottom: '40%',
    position: 'relative',
}));

const InfoModalBackdropWrapper = styled(Box)(() => ({
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.06) 85%, rgba(0,0,0,0) 100%)',
    position: 'absolute',
    width: '100%',
    height: '100%',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '8px',
    top: '8px',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
    backdropFilter: 'blur(10)',
    color: '#ffffff',
    '&:hover': {
        color: '#ffffff',
        backgroundColor: alpha(theme.palette.background.default, 1),
    },
}));

const ModalImage = styled('img')(() => ({
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
}));

interface GenreChipProps {
    id: number;
    name: string;
}

const DInfoModal = ({ item, type, currentState, closeInfoModal }: any) => {
    return (
        <InfoModal
            onClose={closeInfoModal}
            aria-labelledby='customized-dialog-title'
            open={currentState}
        >
            <InfoModalBackdrop>
                <ModalImage
                    src={`${APP_API_PATH}${APP_API_VERSION_PATH}/assets/image/${APP_BACKDROP_QUALITY}${item.backdrop_path}`}
                    alt=''
                />
                <InfoModalBackdropWrapper />
            </InfoModalBackdrop>
            {closeInfoModal ? (
                <CloseButton aria-label='close' onClick={closeInfoModal}>
                    <i className='ri-close-line'></i>
                </CloseButton>
            ) : null}
            <DialogContent dividers>
                <Box sx={{ marginBottom: '20px' }}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/${type}/${item.tmdb_id}`}
                        key={item.id}
                    >
                        <DButton
                            sx={{ marginRight: 2 }}
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<i className='ri-play-mini-fill'></i>}
                        >
                            Play Now
                        </DButton>
                    </Link>
                    <DButton
                        sx={{
                            '& .MuiButton-startIcon': { marginRight: '0px' },
                        }}
                        startIcon={<i className='ri-add-circle-line'></i>}
                        variant='contained'
                        color='secondary'
                        size='small'
                    />
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: '400' }} variant='h5' gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography gutterBottom>{item.description}</Typography>
                </Box>
                <Box>
                    <Typography variant='subtitle2' gutterBottom>
                        {item.genres &&
                            item.genres.map((genre: GenreChipProps) => (
                                <Chip
                                    sx={{
                                        marginRight: '10px',
                                        marginBottom: '10px',
                                    }}
                                    key={genre.id}
                                    label={genre.name}
                                />
                            ))}
                    </Typography>
                </Box>
            </DialogContent>
        </InfoModal>
    );
};

export default DInfoModal;
