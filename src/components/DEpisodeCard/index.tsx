import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { APP_NO_IMAGE_POSTER } from '../../config';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_THUMBNAIL_QUALITY } from '../../config';
import DInfoModal from '../DInfoModal';
import {
    BottomButtonWrapper,
    Button,
    Card,
    CardTitle,
    CardWrapper,
    EpisodeTag,
    ImageWrapper,
    ItemImage,
    PlayButton,
    TopContentWrapper,
} from './styles';

const DEpisodeCard = ({ data, item, season_index }: any) => {
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
                <ImageWrapper className='imageWrapper'>
                    <ItemImage
                        className='image'
                        src={
                            (item &&
                                item.thumbnail_path &&
                                `${APP_API_PATH}${APP_API_VERSION_PATH}/assets/image/${APP_THUMBNAIL_QUALITY}${item.thumbnail_path}`) ||
                            APP_NO_IMAGE_POSTER
                        }
                        alt=''
                    />
                    <Link
                        to={`episode/${item.episode_number}`}
                        state={{ data: data, item: item, season_index: season_index }}
                        key={`episode-${item.episode_number}`}
                    >
                        <PlayButton className='playButton'>
                            <i className='ri-play-mini-fill'></i>
                        </PlayButton>
                    </Link>
                </ImageWrapper>
                <TopContentWrapper className='topContentWrapper'>
                    <EpisodeTag size='small' label={'E' + item.episode_number} />
                </TopContentWrapper>
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
            <CardTitle className='cardTitle'>
                {(item && item.title && (item.title || null)) ||
                    (item && item.name && (item.name || null))}
            </CardTitle>
            <DInfoModal
                item={item}
                type='episode'
                currentState={openModalState}
                closeInfoModal={closeInfoModal}
            />
        </Card>
    );
};

export default DEpisodeCard;
