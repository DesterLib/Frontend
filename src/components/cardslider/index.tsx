import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import Card from 'components/card';
import Icon from 'components/icon';
import shuffle from 'lodash/shuffle';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

type Props = {
    title: string;
    items: any;
    random: boolean;
};

let settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    swipeToSlide: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 2000,
            settings: {
                slidesToShow: 8,
            },
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 7,
            },
        },
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 7,
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 7,
            },
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 6,
            },
        },
        {
            breakpoint: 940,
            settings: {
                slidesToShow: 5,
            },
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 620,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
            },
        },
    ],
};

const CardSlider = (props: Props) => {
    const { title, items, random } = props;
    const ref = React.useRef<any>(null);
    const onClickNext = () => {
        ref.current.slickNext();
    };
    const onClickPrevious = () => {
        ref.current.slickPrev();
    };
    return (
        <Box sx={{ padding: '20px', paddingBottom: '0px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '10px',
                }}
            >
                <Typography variant='h6'>{title}</Typography>
                <Box>
                    <IconButton onClick={onClickPrevious} sx={{ marginRight: '10px' }}>
                        <Icon name='chevron_left' />
                    </IconButton>
                    <IconButton onClick={onClickNext}>
                        <Icon name='chevron_right' />
                    </IconButton>
                </Box>
            </Box>
            <Slider ref={ref} {...settings}>
                {random
                    ? shuffle(items).map((item: any) => (
                          <Box key={item.id}>
                              <Box style={{ padding: '5px' }}>
                                  <Card item={item} />
                              </Box>
                          </Box>
                      ))
                    : items.map((item: any) => (
                          <Box key={item.id}>
                              <Box style={{ padding: '5px' }}>
                                  <Card item={item} />
                              </Box>
                          </Box>
                      ))}
            </Slider>
        </Box>
    );
};

export default CardSlider;
