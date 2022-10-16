import {
    alpha,
    Box,
    Dialog,
    DialogActions,
    LinearProgress,
    styled,
    Typography,
} from '@mui/material';
import Button from 'components/button';
import Chip from 'components/chip';
import Icon from 'components/icon';
import IconButton from 'components/iconbutton';
import { motion } from 'framer-motion';
import React from 'react';
import Genres from './genres';

const ImageGradiant = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '11',
    background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0)} 0%, ${alpha(
        theme.palette.background.default,
        1,
    )} 100%)`,
}));

const DialogContent = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
}));

const BackdropWrapper = styled(Box)(({ theme }) => ({
    zIndex: '10',
    position: 'relative',
    aspectRatio: '16/9',
}));

const PosterWrapper = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    padding: '3px',
    position: 'absolute',
    top: '0',
    left: '0',
    marginTop: '20px',
    marginLeft: '20px',
    borderRadius: '13px',
    height: 'fit-content',
    zIndex: '11',
    backgroundColor: alpha(theme.palette.background.default, 0.2),
}));

const BackdropImage = styled(motion.img)(({ theme }) => ({
    display: 'block',
    width: '100%',
}));

const PosterImage = styled('img')(({ theme }) => ({
    display: 'block',
    width: '100px',
    borderRadius: '10px',
    objectFit: 'cover',
}));

const MainContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    zIndex: '11',
    position: 'relative',
}));

type Props = {
    item: any;
    openModal: boolean;
    setOpenModal: any;
};

const Modal = (props: Props) => {
    const { item, openModal, setOpenModal } = props;

    const [imageLoading, setImageLoading] = React.useState(true);

    const imageLoaded = () => {
        setImageLoading(false);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const getYear = (date: string) => {
        return date.substring(0, 4);
    };
    return (
        <Dialog open={openModal} onClose={handleClose}>
            <DialogContent>
                <DialogActions sx={{ position: 'absolute', width: '100%', zIndex: '15' }}>
                    <IconButton color='secondary' onClick={handleClose}>
                        <Icon name='close' />
                    </IconButton>
                </DialogActions>
                <Box sx={{ overflowY: 'auto', position: 'relative' }}>
                    <BackdropWrapper>
                        <BackdropImage
                            src={'https://www.themoviedb.org/t/p/w1280' + item.backdrop_path}
                            alt=''
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: imageLoading ? 0 : 1,
                            }}
                            transition={{ opacity: { delay: 0.1, duration: 0.2 } }}
                            onLoad={imageLoaded}
                        />
                        <ImageGradiant />
                    </BackdropWrapper>
                    <PosterWrapper>
                        <PosterImage
                            src={'https://www.themoviedb.org/t/p/w500' + item.poster_path}
                            alt=''
                        />
                    </PosterWrapper>
                    <MainContent>
                        <Box sx={{ margin: '20px' }}>
                            <Box sx={{ marginBottom: '20px' }}>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{ minWidth: 'fit-content', marginBottom: '5px' }}
                                >
                                    15m 21s remaining
                                </Typography>
                                <LinearProgress
                                    sx={{ borderRadius: '10px' }}
                                    variant='determinate'
                                    value={90}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& > *': { marginLeft: '10px !important' },
                                    marginBottom: '20px',
                                }}
                            >
                                <Button size='large' color='primary' variant='contained' disableElevation>
                                    <Icon name='play_arrow' />
                                    <span style={{ paddingRight: '5px' }}>Continue Watching</span>
                                </Button>
                                <IconButton color='secondary'>
                                    <Icon name='replay' />
                                </IconButton>
                                <IconButton color='secondary'>
                                    <Icon name='smart_display' />
                                </IconButton>
                                <IconButton color='secondary'>
                                    <Icon name='playlist_add' />
                                </IconButton>
                                <IconButton color='secondary'>
                                    <Icon name='more_vert' />
                                </IconButton>
                            </Box>
                            <Box>
                                <Typography variant='h5'>
                                    {item.name || item.title}{' '}
                                    {item.release_date && getYear(item.release_date)}
                                </Typography>
                            </Box>
                            <Box>
                                <Chip color='info' label='Overview' />
                                <Typography variant='body1'>{item.overview}</Typography>
                            </Box>
                            <Box>
                                <Genres genres={item.genre_ids}/>
                            </Box>
                        </Box>
                    </MainContent>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
