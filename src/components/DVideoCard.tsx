import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { APP_NO_IMAGE_POSTER } from '../config';
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
    paddingBottom: '60%',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#000000',
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

const DVideoCard = ({ item }: any) => {
    const [openModalState, setOpenModalState] = useState(false);
    // eslint-disable-next-line
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
                                `https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`) ||
                            APP_NO_IMAGE_POSTER
                        }
                        alt=''
                    />
                    <PlayButton className='playButton'>
                        <i className='ri-play-mini-fill'></i>
                    </PlayButton>
                </ImageWrapper>
            </CardWrapper>
            <DInfoModal item={item} currentState={openModalState} closeInfoModal={closeInfoModal} />
        </Card>
    );
};

export default DVideoCard;
