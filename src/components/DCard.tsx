import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_NO_IMAGE_POSTER,
    APP_POSTER_QUALITY,
} from '../config';
import DInfoModal from './DInfoModal';

const PlayButton = styled('div')(() => ({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    opacity: '0',
    '& i': {
        color: '#ffffff',
        fontSize: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
}));

const ImageWrapper = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    paddingBottom: '150%',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#000000',
}));

const BottomButtonWrapper = styled('div')(() => ({
    position: 'absolute',
    bottom: '0',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    width: '100%',
    opacity: '0',
}));

const Button = styled(IconButton)(({ theme }) => ({
    height: '40px',
    width: '40px',
    color: '#FF007A',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
    backdropFilter: 'blur(10px)',
    transition: '0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}));

const CardTitle = styled(Typography)(() => ({
    padding: '10px',
}));

const Card = styled('div')(({ theme }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    '&:hover .imageWrapper': {
        boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.main, 0.8)}`,
    },
    '&:hover .imageWrapper .playButton': {
        opacity: '1',
    },
    '&:hover .imageWrapper .image': {
        opacity: '0.2',
    },
    '&:hover .bottomButtonWrapper': {
        opacity: '1',
        color: theme.palette.primary.main,
    },
    '& *': {
        transition: '0.2s ease-in',
    },
}));

const CardWrapper = styled('div')(() => ({
    position: 'relative',
    width: '100%',
}));

const ItemImage = styled('img')(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    boxSizing: 'border-box',
    padding: '0',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0',
    height: '0',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
}));

const DCard = ({ item, type }: any) => {
    const [openModalState, setOpenModalState] = useState(false);
    const openInfoModal = (event: any) => {
        event.preventDefault();
        setOpenModalState(true);
    };
    const closeInfoModal = () => {
        setOpenModalState(false);
    };

    return (
        <Card>
            <CardWrapper>
                <ImageWrapper className='imageWrapper'>
                    <ItemImage
                        className='image'
                        src={
                            (item &&
                                item.poster_path &&
                                `${APP_API_PATH}${APP_API_VERSION_PATH}/assets/image/${APP_POSTER_QUALITY}${item.poster_path}`) ||
                            APP_NO_IMAGE_POSTER
                        }
                        alt=''
                    />
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/${type}/${item.tmdb_id}`}
                        key={item.id}
                    >
                        <PlayButton className='playButton'>
                            <i className='ri-play-mini-fill'></i>
                        </PlayButton>
                    </Link>
                </ImageWrapper>
                <BottomButtonWrapper className='bottomButtonWrapper'>
                    <Button
                        onClick={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        sx={{}}
                    >
                        <i className='ri-heart-line'></i>
                    </Button>
                    <Button onClick={openInfoModal} onContextMenu={(e) => e.preventDefault()}>
                        <i className='ri-more-2-fill'></i>
                    </Button>
                </BottomButtonWrapper>
            </CardWrapper>
            <CardTitle>
                {(item && item.title && (item.title || null)) ||
                    (item && item.name && (item.name || null))}
            </CardTitle>
            <DInfoModal
                item={item}
                type={type}
                currentState={openModalState}
                closeInfoModal={closeInfoModal}
            />
        </Card>
    );
};

export default DCard;
