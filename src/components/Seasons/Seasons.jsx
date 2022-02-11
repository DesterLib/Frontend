import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Badge, Col, Dropdown, Figure, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_BACKDROP, PLACEHOLDER_POSTER } from '../../config';
import { getSeasonNumber } from '../../utilities';
import "./style.css";

const Seasons = ({parentName, apiId, parentId, seasons, tmdbSeasons}) => {

    console.log(seasons)

    return (
        <Row className="m-2 pt-2">
            <h4 style={{color: "var(--text)"}}>Seasons</h4>
            {seasons && tmdbSeasons && seasons.length > 0 && tmdbSeasons.length > 0 && (seasons.map((season, index) => (
                <Col key={index} className="p-lg-4 p-sm-3" xs={6} sm={4} md={3} lg={3} xl={2}>
                        <Figure>
                            <div className="card-img mb-2">
                                <div className="card-info-season">
                                    <Badge className="three-side-rounded-badge" bg="dark">Season {getSeasonNumber(season.name,index + 1)}</Badge>
                                </div>
                                <Link to={`/serie/${parentId}/season/${season.id}?index_no=${index}&season_no=${getSeasonNumber(season.name,index + 1)}&api_id=${apiId}&serie_name=${parentName}`}>
                                <div className="item-trailer-video">
                                    {tmdbSeasons[getSeasonNumber(season.name,index + 1)] ? <Figure.Image className="card-image" src={"https://image.tmdb.org/t/p/w500" + tmdbSeasons[getSeasonNumber(season.name,index + 1)].poster_path} onError={(e)=>{e.target.onerror = null; e.target.src=PLACEHOLDER_BACKDROP}}/> : <Figure.Image className="card-image" src={PLACEHOLDER_POSTER}/>}
                                    <div className="middle">
                                        <span className="round-button">
                                            <i className="bi bi-play-fill"></i>
                                        </span>
                                    </div>
                                </div>
                                </Link>
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" className="additional-info-button">
                                    <i className="bi bi-three-dots"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>{season.name}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Figure>
                </Col>
            )))}
            { (!seasons || seasons.length === 0) && (<h5 className="color-white">No Seasons Found</h5>) }
        </Row>
    );
};

export default Seasons;
