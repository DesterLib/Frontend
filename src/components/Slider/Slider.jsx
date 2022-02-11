import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, A11y } from "swiper";
import 'swiper/swiper-bundle.min.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { guid } from "../../utilities";
import { Badge, Container, Figure, OverlayTrigger, Tooltip } from "react-bootstrap";
import { PLACEHOLDER_POSTER } from "../../config";
import "./style.css";

const Slider = ({ metadata, type }) => {

    SwiperCore.use([Autoplay, Navigation, A11y]);

    return (
        <Container fluid className="slider-container">
        {type === "item" ? 
          <>
          {metadata && metadata.length
          ? metadata.map((category) =>
              category.children.length ? (
                <div className="slider-category" key={guid()}>
                  <div className="p-0 m-0">
                    <div className="p-0 m-0">
                      <Link
                        id={`${category.categoryInfo.name}`}
                        to={`/category/${category.categoryInfo.name}`}
                        key={guid()}
                        className="slider-category-title non-anchor"
                      >
                      <span className="category-name selectable"><i className="bi bi-tags-fill"></i>{category.categoryInfo.name}</span>
                      </Link>
                    </div>
                  </div>
                  <Swiper
                    className="sslider sslider-landscape p-2 hide-navigation"
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
                    {category.children.length
                      ? category.children.map((item, index) => (
                        <SwiperSlide className="slider-slide" key={guid()}>
                            <Link
                              to={`/${item.type === "file" ? "movie" : "serie"}/${
                                item.id
                              }`}
                              key={guid()}
                            >
                              <OverlayTrigger
                                key={guid()}
                                placement="auto-end"
                                overlay={
                                    <Tooltip className="hover-overview" id={`tooltip-${guid()}`}>
                                          <div>
                                            <div className="title">{item.title}</div>
                                            <div className="extra-info">{item.type === "file" ? "Movie" : "Serie"}</div>
                                            <div className="genre-badge-container">
                                              {item.genres ? item.genres.map((genre) => (
                                                <Badge key={guid()} pill className="genre-badge">{genre}</Badge>
                                              )) : <></>}
                                            </div>
                                          </div>
                                    </Tooltip>
                                }
                              >
                                <Figure className="slider-figure">
                                    <div className="card-img">
                                        <div className="card-rating">
                                            <CircularProgressbar
                                                value={item.api === "tmdb" ? parseInt(item.voteAverage * 10) : parseInt(item.voteAverage)}
                                                text={`${item.api === "tmdb" ? parseInt(item.voteAverage * 10) : parseInt(item.voteAverage)}%`}
                                                background={true}
                                                backgroundPadding={5}
                                                maxValue={100}
                                                styles={buildStyles({
                                                    rotation: 0.25,
                                                    strokeLinecap: 'butt',
                                                    textSize: '25px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: `rgb(20, 220, 160)`,
                                                    textColor: '#ffffff',
                                                    trailColor: '#165764',
                                                    backgroundColor: '#0a2b31',
                                                })}
                                            />
                                        </div>
                                        <Figure.Image
                                            className="collection-bg-image"
                                            src={item.posterPath !== null ? item.posterPath : PLACEHOLDER_POSTER}
                                            alt={item.title}
                                        />
                                    </div>
                                    <Figure.Caption>
                                        <span className="selectable">{item.title}</span>
                                    </Figure.Caption>
                                </Figure>
                              </OverlayTrigger>
                            </Link>
                        </SwiperSlide>
                        ))
                      : null}
                </Swiper>
                </div>
              ) : null
            )
          : null}
          </>
        : 
        <div className="slider-category m-4" key={guid()}>
          <div className="p-0 m-0">
            <div className="p-0 m-0">
              <span className="category-name"><i className="bi bi-view-list"></i>Cast</span>
            </div>
          </div>
          <Swiper
            className="sslider sslider-landscape p-2 hide-navigation"
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
                    "slidesPerView": 4,
                    "spaceBetween": 10
                },
                "740": {
                    "slidesPerView": 6,
                    "spaceBetween": 20
                },
                "1194": {
                    "slidesPerView": 9,
                    "spaceBetween": 20
                }
            }}
            >
            {metadata.length
              ? metadata.map((item) => (
                <SwiperSlide className="slider-slide" key={guid()}>
                  <Figure className="slider-figure">
                      <div className="card-img">
                          <Figure.Image
                              className="collection-bg-image"
                              src={"https://image.tmdb.org/t/p/original" + item.profile_path}
                              onError={(e)=>{e.target.onerror = null; e.target.src=PLACEHOLDER_POSTER}}
                              alt={item.name}
                              style={{borderRadius: "10px"}}
                          />
                      </div>
                      <Figure.Caption>
                          <span>{item.name}</span>
                      </Figure.Caption>
                  </Figure>
                </SwiperSlide>
              ))
            : null}
          </Swiper>
        </div>
      }
    </Container>
  );
}

export default Slider;