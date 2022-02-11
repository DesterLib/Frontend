import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Carousel, Container, Figure } from 'react-bootstrap';
import "./style.css"
import { PLACEHOLDER_BACKDROP, PLACEHOLDER_POSTER } from '../../config';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, A11y } from "swiper";
import { guid } from '../../utilities';

const LoadingHome = () => {
    const placeholderContainerArray = [1,2,3,4]
    const placeholderArray = [1,2,3,4,5,6,7,8,9,10]
    SwiperCore.use([Autoplay, Navigation, A11y]);
    return (
        <>
            <Carousel fade style={{marginBottom: "25px"}}>
                <Carousel.Item>
                    <Carousel.Caption style={{"width": "100%"}}>
                    </Carousel.Caption>

                    <div className="container-home-bg justify-content-center col-lg-8 g-0">
                        <div className="item-bg-shadow-carousel"></div>
                        <img className="img-fluid" src={PLACEHOLDER_BACKDROP} alt=""/>
                    </div>
                </Carousel.Item>
            </Carousel>
            {placeholderContainerArray.map((placeholderContainer) => (
            <Container fluid key={guid()}>
                <Container fluid>
                    <h4 className="card-collection-title"><Skeleton width={280} baseColor="var(--loadingBg)" highlightColor="var(--loadingShine)"/></h4>
                </Container>
                    <Swiper
                        className="sslider sslider-portrait p-2"
                        navigation
                        breakpoints={{
                            "240": {
                                "slidesPerView": 2,
                                "spaceBetween": 10
                            },
                            "385": {
                            "slidesPerView": 3,
                            "spaceBetween": 10
                        },
                            "470": {
                                "slidesPerView": 3,
                                "spaceBetween": 10
                            },
                            "740": {
                                "slidesPerView": 4,
                                "spaceBetween": 20
                            },
                            "1194": {
                                "slidesPerView": 6,
                                "spaceBetween": 20
                            }
                        }}
                        >
                        {placeholderArray.map((placeholder) => (
                            <SwiperSlide key={guid()} className="sslider-slide">
                                <Figure className="show-hover-hidden">
                                    <div className="card-img">
                                        <Figure.Image
                                            className="collection-bg-image rounded img-fluid"
                                            alt="PlaceHolder"
                                            src={PLACEHOLDER_POSTER}
                                        />
                                    </div>
                                    <Figure.Caption>
                                        <Skeleton baseColor="var(--loadingBg)" highlightColor="var(--loadingShine)"/>
                                    </Figure.Caption>
                                </Figure>
                            </SwiperSlide>
                        ))}
                    </Swiper>
            </Container>
            ))}
        </>
    )
};

export default LoadingHome;
