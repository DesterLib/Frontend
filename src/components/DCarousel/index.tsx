import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { A11y, Autoplay, EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_POSTER_QUALITY,
} from '../../config';
import styles from '../../styles/DCarousel.module.css';
import useBreakpoint from '../../utilities/useBreakpoint';
import DButton from '../DButton';
import DItemLogo from '../DItemLogo';
import {
    CarouselWrapper,
    HeaderImage,
    ItemBackground,
    ItemContentDescription,
    ItemContentTitleDown,
    ItemContentTitleUp,
    ItemContentWrapper,
    LinearGradient,
    StyledChip,
    StyledGridContainerChild,
    StyledGridContainerParent,
} from './styles';

const DSlide = ({ item, type }: any) => {
    const breakpoint = useBreakpoint();
    const navigate = useNavigate();
    return (
        <CarouselWrapper>
            <ItemBackground>
                {(breakpoint === 'xs' || breakpoint === 'sm') && (
                    <>
                        <HeaderImage
                            src={
                                APP_API_PATH +
                                APP_API_VERSION_PATH +
                                '/assets/image/' +
                                APP_POSTER_QUALITY +
                                item.poster_path
                            }
                            alt={item.title}
                        />
                        <LinearGradient />
                    </>
                )}
                {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                    <>
                        <HeaderImage
                            src={
                                APP_API_PATH +
                                APP_API_VERSION_PATH +
                                '/assets/image/' +
                                APP_BACKDROP_QUALITY +
                                item.backdrop_path
                            }
                            alt={item.title}
                        />
                        <LinearGradient />
                    </>
                )}
            </ItemBackground>
            <ItemContentWrapper>
                <DItemLogo src={`https://www.themoviedb.org/t/p/w1280/${item.logo_path}`} />
                {(breakpoint === 'xs' || breakpoint === 'sm') && (
                    <ItemContentTitleDown variant='h5'>{item.title}</ItemContentTitleDown>
                )}
                {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                    <ItemContentTitleUp variant='h4'>{item.title}</ItemContentTitleUp>
                )}
                <ItemContentDescription noWrap variant='subtitle1'>
                    {item.description}
                </ItemContentDescription>
                <StyledGridContainerParent container>
                    <StyledGridContainerChild container>
                        <StyledChip className='year' label='2020' />
                        <StyledChip
                            className='rating'
                            icon={<i className='ri-star-fill'></i>}
                            label='8.6'
                        />
                        <StyledChip
                            className='type'
                            label='Movie'
                            style={{
                                backgroundColor: '#d9292f55',
                                border: '1px solid #ff411299',
                            }}
                        />
                    </StyledGridContainerChild>
                    <Grid sx={{ marginRight: '10px' }} item>
                        <DButton
                            variant='contained'
                            color='primary'
                            startIcon={<i className='ri-play-mini-fill'></i>}
                            onClick={() => navigate(`/${type}/${item.tmdb_id}`)}
                        >
                            PLAY NOW
                        </DButton>
                    </Grid>
                    <Grid sx={{ marginRight: '10px' }} item>
                        <DButton
                            startIcon={<i className='ri-add-circle-line'></i>}
                            variant='contained'
                            color='secondary'
                        >
                            ADD TO LIST
                        </DButton>
                    </Grid>
                    <Grid item>
                        <DButton
                            startIcon={<i className='ri-more-2-fill'></i>}
                            sx={{
                                span: {
                                    margin: '0px',
                                },
                            }}
                            color='secondary'
                            variant='contained'
                        />
                    </Grid>
                </StyledGridContainerParent>
            </ItemContentWrapper>
        </CarouselWrapper>
    );
};

const DCarousel = ({ itemData }: any) => {
    SwiperCore.use([Autoplay, EffectFade, Navigation, A11y]);
    console.log(itemData);
    return (
        <Swiper
            effect={'fade'}
            loop
            autoplay
            navigation
            slidesPerView={1}
            className={styles.carousel}
        >
            {itemData &&
                itemData.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className={styles.carouselSlideWrapper}>
                            <DSlide item={item} type='movie' />
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};

export default DCarousel;
