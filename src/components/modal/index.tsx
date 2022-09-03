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
import React from 'react';

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
    openModal: boolean;
    setOpenModal: any;
};

const Modal = (props: Props) => {
    const { openModal, setOpenModal } = props;

    const handleClose = () => {
        setOpenModal(false);
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
                    <Box sx={{ zIndex: '10', position: 'relative' }}>
                        <img
                            style={{ display: 'block' }}
                            width='100%'
                            src='https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/hw7foD5in5YCs7qY3Pap9pdc1Vc.jpg'
                            alt=''
                        />
                        <ImageGradiant />
                    </Box>
                    <PosterWrapper>
                        <PosterImage
                            src='https://www.themoviedb.org/t/p/w440_and_h660_face/neMZH82Stu91d3iqvLdNQfqPPyl.jpg'
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
                                <Button color='primary' variant='contained' disableElevation>
                                    <Icon style={{ paddingRight: '5px' }} name='play_arrow' />
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
                            <Typography variant='h5'>The Lost City (2022)</Typography>
                            <Chip color='info' label='Overview' />
                            <Typography variant='body1'>
                                Reclusive author Loretta Sage writes about exotic places in her
                                popular adventure novels that feature a handsome cover model named
                                Alan. While on tour promoting her new book with Alan, Loretta gets
                                kidnapped by an eccentric billionaire who hopes she can lead him to
                                the ancient city's lost treasure that featured in her latest story.
                                Alan, determined to prove he can be a hero in real life and not just
                                on the pages of her books, sets off to rescue her.
                            </Typography>
                        </Box>
                    </MainContent>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
