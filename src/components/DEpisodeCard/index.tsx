import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { APP_NO_IMAGE_POSTER } from '../../config';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../../config';
import DInfoModal from '../DInfoModal';
import DStreamModal from '../DStreamModal';
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

const DEpisodeCard = ({ item, rclone_index }: any) => {
    const [openModalState, setOpenModalState] = useState(false);
    const [streamModalState, setStreamModalState] = useState(false);
    const [videoData, setVideoData] = useState<any>({});

    // eslint-disable-next-line
    const openInfoModal = (event: any) => {
        event.preventDefault();
        setOpenModalState(true);
    };
    const closeInfoModal = () => {
        setOpenModalState(false);
    };

    // eslint-disable-next-line
    const openStreamModal = (event: any) => {
        event.preventDefault();
        const videoData = {
            id: '1',
            title: item.title,
            subTitle: item.title,
            url: `${APP_API_PATH}${APP_API_VERSION_PATH}/stream/${rclone_index}/${item.path}`,
            playlist: [],
        };
        setVideoData(videoData);
        setStreamModalState(true);
    };
    const closeStreamModal = () => {
        setStreamModalState(false);
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
                                `${APP_API_PATH}${APP_API_VERSION_PATH}/assets/image/${APP_POSTER_QUALITY}${item.thumbnail_path}`) ||
                            APP_NO_IMAGE_POSTER
                        }
                        alt=''
                    />
                    <PlayButton className='playButton' onClick={openStreamModal}>
                        <i className='ri-play-mini-fill'></i>
                    </PlayButton>
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
                type='movie'
                currentState={openModalState}
                closeInfoModal={closeInfoModal}
            />
            <DStreamModal
                videoData={videoData}
                currentState={streamModalState}
                closeInfoModal={closeStreamModal}
            />
        </Card>
    );
};

export default DEpisodeCard;
