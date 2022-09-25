import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Box from '@mui/material/Box';
import { SlideMain, SlideThumbnail } from './slide';

type Props = {
    items: any;
};

const MainSlider = (props: Props) => {
    const { items } = props;
    let settings1 = {
        dots: true,
        lazyLoad: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        fade: true,
        arrows: false,
        customPaging: function (index: number) {
            return (
                <a>
                    <SlideThumbnail item={items[index++]} />
                </a>
            );
        },
    };
    return (
        <Box>
            <Slider {...settings1}>
                {items.slice(0, 3).map((item: any) => (
                    <Box key={item.id}>
                        <SlideMain item={item} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default MainSlider;
