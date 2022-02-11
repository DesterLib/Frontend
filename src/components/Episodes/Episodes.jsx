import React from 'react';
import { Badge, Col, Dropdown, Figure, Row } from 'react-bootstrap';
import { Link, useLocation, useSearchParams} from 'react-router-dom';
import { PLACEHOLDER_BACKDROP } from '../../config';

const Episodes = ({showPlayer, setShowPlayer, episodesData, episodesTmdbData}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const handleShowPlayer = () => setShowPlayer(true);

    const index_no = searchParams.get("index_no");
    const season_index_no = searchParams.get("season_no");
    const api_id = searchParams.get("api_id");
    const serie_name = searchParams.get("serie_name");

    const location = useLocation();
    const serieId = location.pathname.split("/")[2];
    const seasonId = location.pathname.split("/")[4];

    return (
        <Row className="p-4 m-0 page-bottom-margin">
            <h2 style={{color: "var(--text)", padding: "20px"}}>Episodes</h2>
            {episodesData && episodesData.length > 0 && (episodesData.map((episode, index) => (
                <Col key={index} className="p-lg-4 p-sm-3" xs={12} sm={6} md={4} lg={3} xl={3}>
                    {episode && (
                        <Figure>
                            <div className="item-trailer-video mb-2">
                                <div className="card-info-episode">
                                    <Badge className="three-side-rounded-badge" bg="dark">S-{episodesTmdbData[index] ? episodesTmdbData[index].season_number : season_index_no} . E-{episodesTmdbData[index] ? episodesTmdbData[index].episode_number : index + 1}</Badge>
                                </div>
                                <Link to={`/serie/${serieId}/season/${seasonId}/episode/${episode.id}?index_no=${index_no}&season_no=${season_index_no}&api_id=${api_id}&serie_name=${serie_name}&episode_index=${index}`} onClick={() => handleShowPlayer()}>
                                <div className="card-img-image">
                                    <Figure.Image className="img-fluid card-image three-side-rounded-img" src={ episodesTmdbData[index] ? "https://image.tmdb.org/t/p/w500" + episodesTmdbData[index].still_path : PLACEHOLDER_BACKDROP} onError={(e)=>{e.target.onerror = null; e.target.src=PLACEHOLDER_BACKDROP}}/>
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
                                        <Dropdown.Item>{episode.name}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <Figure.Caption> 
                                <span>{episodesTmdbData[index] ? episodesTmdbData[index].name : episode.name}</span>
                            </Figure.Caption>
                        </Figure>
                    )}
                </Col>
            )))}
            { (!episodesData || episodesData.length === 0) && (<h5 className="color-white">No Episodes Found</h5>) }
        </Row>
    );
};

export default Episodes;
