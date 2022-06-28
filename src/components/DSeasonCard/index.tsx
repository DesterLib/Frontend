import React from 'react';
import { Link } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_NO_IMAGE_POSTER,
    APP_POSTER_QUALITY,
} from '../../config';
// import DInfoModal from '../DInfoModal';
import { Card, CardTitle, CardWrapper, ImageWrapper, ItemImage, PlayButton } from './styles';

const DSeasonCard = ({ data, type, seasonKey }: any) => {
    /*
    const [openModalState, setOpenModalState] = useState(false);
    const openInfoModal = (event: any) => {
        event.preventDefault();
        setOpenModalState(true);
    };
    const closeInfoModal = () => {
        setOpenModalState(false);
    };

    <BottomButtonWrapper className='bottomButtonWrapper'>
        <Button onClick={openInfoModal} onContextMenu={(e) => e.preventDefault()}>
            <i className='ri-more-2-fill'></i>
        </Button>
    </BottomButtonWrapper>
    */
    const item = data.seasons[seasonKey];

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
                        to={`season/${item.season_number}`}
                        state={{ data: data, type: type, seasonKey: seasonKey }}
                        key={item.id}
                    >
                        <PlayButton className='playButton'>
                            <i className='ri-play-mini-fill'></i>
                        </PlayButton>
                    </Link>
                </ImageWrapper>
            </CardWrapper>
            <CardTitle>
                {(item && item.title && (item.title || null)) ||
                    (item && item.name && (item.name || null))}
            </CardTitle>
        </Card>
    );
};

export default DSeasonCard;
