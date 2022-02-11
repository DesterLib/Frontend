import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Carousel } from 'react-bootstrap';
import { guid } from '../../utilities';
import "./style.css";

const MainCarousel = ({ metadata }) => {

    let itemData = "";
    let itemType = "";

    let currentItemType = "";
    let currentItemName = "";

    if (metadata && metadata && metadata.children) itemData = metadata.children;
    if (metadata && metadata && metadata.categoryInfo) itemType = metadata.categoryInfo;

    if (itemType && itemType.type === "Movies") {
        currentItemType = "movie"
        currentItemName = "Movie"
    } else {
        currentItemType = "serie"
        currentItemName = "Serie"
    }

    return (
        <Carousel fade style={{marginBottom: "25px"}}>
            { itemData && (itemData.slice(0, 5).map((item) => (
            <Carousel.Item key={item.id}>
                <Carousel.Caption style={{"width": "100%"}}>
                    <div className="container-home-info col-lg-6 g-0">
                        <div className="home-bg-info-0">
                            <img className="img-fluid home-bg-logo hide" src="" alt=""/>
                            <h2 className="selectable">{item.title}</h2>
                        </div>
                        <div className="home-bg-info-1">
                            <span className="movie-year">{item.releaseDate}</span><span className="break">|</span><span className="movie-age-rating">{item.adult ? "R" : "PG"}<span className="break">|</span>{currentItemName}</span>
                        </div>
                        <div className="home-bg-info-2 hide">
                            {item.genres.map((genre) => (
                                <a href="/#" key={guid()}>&nbsp;<Badge pill text="light"><i className="bi bi-record-circle-fill"></i>{genre}</Badge></a>
                            ))}
                        </div>
                        <div className="home-bg-info-3">
                            <Button href={`/${currentItemType}/${item.id}`} variant="light"><i className="bi bi-play-fill"></i><span>Play Now</span></Button>
                            <Button><i className="bi bi-plus-circle"></i><span>Add to List</span></Button>
                        </div>
                    </div>
                </Carousel.Caption>

                <div className="container-home-bg justify-content-center col-lg-8 g-0">
                    <div className="item-bg-shadow-carousel"></div>
                    <img className="img-fluid" src={item.backdropPath} alt=""/>
                </div>
            </Carousel.Item>
            )))}
        </Carousel>
    );
};

export default MainCarousel;