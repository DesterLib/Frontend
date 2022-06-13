import React, { useState } from 'react';

import { APP_NO_IMAGE_POSTER } from '../../config';
import DVideoModal from '../DVideoModal';
import { Card, CardWrapper, ImageContainer, ItemImage, PlayButton } from './styles';

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
                <ImageContainer className='imageWrapper'>
                    <ItemImage
                        className='image'
                        src={
                            (item &&
                                item.key &&
                                `https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`) ||
                            APP_NO_IMAGE_POSTER
                        }
                        alt={item.key}
                    />
                    <PlayButton className='playButton' onClick={openInfoModal}>
                        <i className='ri-play-mini-fill'></i>
                    </PlayButton>
                </ImageContainer>
            </CardWrapper>
            <DVideoModal
                item={item}
                currentState={openModalState}
                closeInfoModal={closeInfoModal}
            />
        </Card>
    );
};

export default DVideoCard;
