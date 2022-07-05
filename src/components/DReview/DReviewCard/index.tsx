import Typography from '@mui/material/Typography';
import React from 'react';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../../../config';
import {
    AvatarContainer,
    AvatarImg,
    AvatarTitle,
    AvatarWrapper,
    ContentWrapper,
    DateWrapper,
    FeaturedTitleWrapper,
    ListItemWrapper,
    MainContainer,
    SubContainer,
} from './styles';

const DReviewCard = ({ item }: any) => {
    var avatar_path = '';
    if (item.author_details.avatar_path && item.author_details.avatar_path.startsWith('/')) {
        avatar_path = (item.author_details.avatar_path || '/').substring(1);
    }
    if (avatar_path.length && !avatar_path.startsWith('https://')) {
        avatar_path =
            APP_API_PATH +
            APP_API_VERSION_PATH +
            '/assets/image/' +
            APP_POSTER_QUALITY +
            item.author_details.avatar_path;
    }

    return (
        <ListItemWrapper>
            <AvatarContainer>
                <AvatarWrapper>
                    <AvatarImg src={avatar_path}></AvatarImg>
                </AvatarWrapper>
            </AvatarContainer>
            <MainContainer>
                <SubContainer>
                    <AvatarTitle variant='subtitle1'>
                        {item.author_details.name || item.author || item.author_details.username}
                    </AvatarTitle>
                    <FeaturedTitleWrapper>
                        <i
                            style={{ color: '#FFD333', marginLeft: '10px' }}
                            className='ri-star-fill'
                        ></i>
                        <Typography noWrap sx={{ padding: '0px 7px' }} variant='body2'>
                            {item.author_details.rating}
                        </Typography>
                    </FeaturedTitleWrapper>
                </SubContainer>
                <ContentWrapper>
                    <Typography variant='body2'>{item.content}</Typography>
                </ContentWrapper>
                <DateWrapper>
                    <Typography variant='overline'>
                        {new Date(
                            Date.parse(item.updated_at || item.created_at),
                        ).toLocaleDateString('en-US')}
                    </Typography>
                </DateWrapper>
            </MainContainer>
        </ListItemWrapper>
    );
};

export default DReviewCard;
