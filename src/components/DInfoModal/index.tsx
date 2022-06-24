import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_THUMBNAIL_QUALITY,
} from '../../config';
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
    return type == 'series' || type == 'movie' ? (
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
                            sx={{
                                marginRight: '5px',
                            }}
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<i className='ri-play-mini-fill'></i>}
                        >
                            PLAY
                        </DButton>
                    </Link>
                    <DButton
                        sx={{
                            marginRight: '5px',
                        }}
                        startIcon={<i className='ri-heart-line'></i>}
                        variant='icon'
                        color='secondary'
                    />
                    <DButton
                        sx={{
                            marginRight: '5px',
                        }}
                        startIcon={<i className='ri-add-circle-line'></i>}
                        variant='icon'
                        color='secondary'
                    />
                    <ChipContainer>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={'/browse'}
                            state={{
                                year: item.year,
                                mediaType: item == 'movie' ? 'movies' : 'series',
                            }}
                            key={`${item.id}-year`}
                        >
                            <StyledChip className='year' clickable label={item.year} />
                        </Link>
                        <StyledChip
                            className='rating'
                            icon={<i style={{ color: '#ffd000' }} className='ri-star-fill'></i>}
                            label={item.rating}
                        />
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={'/browse'}
                            state={{ mediaType: type == 'movie' ? 'movies' : 'series' }}
                            key={`${item.id}-type`}
                        >
                            <StyledChip
                                className='type'
                                clickable
                                icon={
                                    <i
                                        style={{ color: '#ffd000' }}
                                        className={
                                            type == 'movie' ? 'ri-movie-2-fill' : 'ri-tv-fill'
                                        }
                                    ></i>
                                }
                                label={item == 'movie' ? 'Movie' : 'Series'}
                            />
                        </Link>
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
    ) : type == 'season' ? (
        <div></div>
    ) : type == 'episode' ? (
        <InfoModal
            onClose={closeInfoModal}
            aria-labelledby='customized-dialog-title'
            open={currentState}
        >
            <InfoModalBackdrop>
                <ModalImage
                    src={`${APP_API_PATH}${APP_API_VERSION_PATH}/assets/image/${APP_THUMBNAIL_QUALITY}${item.thumbnail_path}`}
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
                            PLAY
                        </DButton>
                    </Link>
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
                        <StyledChip
                            className='year'
                            label={new Date(item.air_date).toDateString().slice(4)}
                        />
                        <StyledChip
                            className='rating'
                            icon={<i style={{ color: '#ffd000' }} className='ri-star-fill'></i>}
                            label={item.rating}
                        />
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={'/browse'}
                            state={{ mediaType: type == 'movie' ? 'movies' : 'series' }}
                            key={`${item.id}-type`}
                        >
                            <StyledChip
                                className='type'
                                clickable
                                icon={
                                    <i
                                        style={{ color: '#ffd000' }}
                                        className={
                                            type == 'movie' ? 'ri-movie-2-fill' : 'ri-tv-fill'
                                        }
                                    ></i>
                                }
                                label={item == 'movie' ? 'Movie' : 'Series'}
                            />
                        </Link>
                    </ChipContainer>
                </ButtonWrapper>
                <Box>
                    <Typography sx={{ fontWeight: '400' }} variant='h5' gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography gutterBottom>{item.description}</Typography>
                </Box>
            </DialogContent>
        </InfoModal>
    ) : null;
};

export default DInfoModal;
