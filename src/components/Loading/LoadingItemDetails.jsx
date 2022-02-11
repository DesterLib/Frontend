import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Carousel, Container, Figure, Ratio } from 'react-bootstrap';
import { Navbar } from '..';
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
            <Row className="item-bg-container" style={{backgroundImage: `url("${itemData.backdropPath}")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <Col className="item-shadow-container" lg={{span: 8, order: 2}}>
                    <img src={itemData.backdropPath} alt=""/>
                    <div className="item-bg-shadow"></div>
                </Col>
                <Col lg={{ span: 4, order: 1}} className="item-info-container">
                    <span className="item-logo-main">
                        <span className="item-title">{itemData.title}</span>
                    </span>
                    <div><span className="item-year">{itemData.releaseDate.substring(0,4)}</span><span className="break">|</span><span className="item-age-rating">{itemData.adult ? "R" : "PG"}</span></div>
                    <span className="item-overview">{itemData.overview}</span>
                    <div className="button-actions-container">
                    {type === "movie" && (<Button className="primary-button mobile-display" onClick={() => handleShowPlayer()}><i className="bi bi-play-fill"></i><span>Play Now</span></Button>)}
                    {type === "tv" && (<Button className="primary-button mobile-display" onClick={() => handleShowPlayer()}><i className="bi bi-play-fill"></i><span>Play Now</span></Button>)}
                    <div className="d-flex">
                        {type === "movie" && (<Button className="primary-button desktop-display" onClick={() => handleShowPlayer()}><i className="bi bi-play-fill"></i><span>Play Now</span></Button>)}
                        {type === "tv" && (<Button className="primary-button desktop-display" onClick={() => handleShowPlayer()}><i className="bi bi-play-fill"></i><span>Play Now</span></Button>)}
                        <Button className="secondary-button" onClick={handleShowTrailer}><i className="bi bi-youtube"></i><span>Trailer</span></Button>
                        <Button className="secondary-button" variant="dark"><i className="bi bi-cloud-arrow-down-fill"></i><span>Download</span></Button>
                        <Button className="secondary-button" disabled variant="dark"><i className="bi bi-plus-lg"></i></Button>
                    </div>
                    </div>
                </Col>
            </Row>
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
