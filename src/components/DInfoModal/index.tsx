import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_BACKDROP_QUALITY } from '../../config';
import DButton from '../DButton';
import {
    ButtonWrapper,
    ChipContainer,
    CloseButton,
    InfoModal,
    InfoModalBackdrop,
    InfoModalBackdropWrapper,
    ModalImage,
    StyledChip,
} from './styles';

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
                <ButtonWrapper>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/${type}/${item.tmdb_id}`}
                        key={item.id}
                    >
                        <DButton
                            sx={{ marginRight: 1 }}
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<i className='ri-play-mini-fill'></i>}
                        >
                            PLAY NOW
                        </DButton>
                    </Link>
                    <DButton
                        sx={{
                            '& .Dester-Button-startIcon': { marginRight: '0px' },
                            marginRight: 1,
                        }}
                        startIcon={<i className='ri-heart-line'></i>}
                        variant='contained'
                        color='secondary'
                        size='small'
                    />
                    <DButton
                        sx={{
                            '& .Dester-Button-startIcon': { marginRight: '0px' },
                        }}
                        startIcon={<i className='ri-add-circle-line'></i>}
                        variant='contained'
                        color='secondary'
                        size='small'
                    />
                    <ChipContainer>
                        <StyledChip className='year' label={item.year} />
                        <StyledChip
                            className='rating'
                            icon={<i style={{ color: '#ffd000' }} className='ri-star-fill'></i>}
                            label={item.rating}
                        />
                        <StyledChip
                            className='type'
                            icon={
                                <i
                                    style={{ color: '#ffd000' }}
                                    className={
                                        item.number_of_files ? 'ri-movie-2-fill' : 'ri-tv-fill'
                                    }
                                ></i>
                            }
                            label={item.number_of_files ? 'Movie' : 'Series'}
                        />
                    </ChipContainer>
                </ButtonWrapper>
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
