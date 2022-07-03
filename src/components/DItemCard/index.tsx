import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_NO_IMAGE_POSTER,
    APP_POSTER_QUALITY,
} from '../../config';
import CircularRating from '../DCircularRating';
import DInfoModal from '../DInfoModal';
import {
    BottomButtonWrapper,
    Button,
    Card,
    CardTitle,
    CardWrapper,
    ImageWrapper,
    ItemImage,
    PlayButton,
    TopButtonWrapper,
} from './styles';

const DItemCard = ({ item, type }: any) => {
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
            <CardWrapper className='cardWrapper'>
                <TopButtonWrapper>
                    <CircularRating value={item.rating * 10} />
                </TopButtonWrapper>
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
            <CardTitle className='cardTitle'>{item.title || item.name}</CardTitle>
            <DInfoModal
                item={item}
                type={type}
                currentState={openModalState}
                closeInfoModal={closeInfoModal}
            />
        </Card>
    );
};

export default DItemCard;
