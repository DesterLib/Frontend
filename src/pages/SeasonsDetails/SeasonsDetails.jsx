import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Episodes, Navigation } from '../../components';
import { getSeasonNumber } from '../../utilities';
import "./style.css";

const SeasonsDetails = () => {

    const location = useLocation();
    const serieId = location.pathname.split("/")[2];
    const seasonId = location.pathname.split("/")[4];

    const [searchParams, setSearchParams] = useSearchParams();
    const [seasonData, setSeasonData] = useState({});
    const [seasonEpisodes, setSeasonEpisodes] = useState([]);
    const [seasonTmdbData, setSeasonTmdbData] = useState({});
    const [seasonTmdbEpisodes, setSeasonTmdbEpisodes] = useState([]);
    const [showPlayer, setShowPlayer] = useState(false);
    // const [seasonError, setSeasonError] = useState({});

    const index_no = searchParams.get("index_no");
    const season_index_no = searchParams.get("season_no");
    const api_id = searchParams.get("api_id");
    const serie_name = searchParams.get("serie_name");

    useEffect(() => {
        const backend_url = process.env.REACT_APP_BACKEND;
        const tmdbkey = process.env.REACT_APP_TMDB;

        function getSeasons() {
            axios.get(`${backend_url}/api/v1/metadata?id=${seasonId}`)
            .then(function(response) {
                setSeasonData(response.data.content)
                setSeasonEpisodes(response.data.content.children)
            })
            .catch(function(error) {
                console.log(error)
            })
        }
        function getTmdbSeasons() {
            axios.get(`https://api.themoviedb.org/3/tv/${api_id}/season/${season_index_no}?api_key=${tmdbkey}`)
            .then(function(response) {
                setSeasonTmdbData(response.data)
                setSeasonTmdbEpisodes(response.data.episodes)
            })
            .catch(function(error) {
                console.log(error)
            })
        }
        getSeasons()
        getTmdbSeasons()
    }, [api_id,season_index_no,seasonId])

    // getSeasonNumber(seasonData.parent_children[+index_no - 1].id,index + 1)

    return (
        <>
        {seasonData && seasonData.parent_children && (
            <Container fluid className="p-0 page-bottom-margin">
            <Navigation/>
                <Row>
                    <Col className="info-container-left season-info-container">
                        <Row>
                            <Col className="p-0" xs={4}>
                                <div className="item-poster-container">
                                    <img className="img-fluid" src={"https://www.themoviedb.org/t/p/w500" + seasonTmdbData.poster_path} alt="" />
                                </div>
                            </Col>
                            <Col className="item-season-container" xs={8}>  
                                <Row>
                                <span className="item-title pb-2">{serie_name} | Season {season_index_no}</span>
                                <span className="item-season-overview desktop-display"><b>Overview</b> - {seasonTmdbData.overview || "No Overview Available"}</span>
                                <span>Available Episodes - {seasonData.children.length + "/" + seasonTmdbData.episodes.length}</span>
                                </Row>   
                                <Row>
                                <span className="season-btn-container"> 
                                {seasonData.children.length === 0 && <Button className="season-btn primary-button mt-3 mb-3"><i className="bi bi-play-fill pe-2"></i><span>No Episodes Found</span></Button>}
                                {seasonData.children.length > 0 &&  <Button className="season-btn primary-button mt-3 mb-3"><i className="bi bi-play-fill pe-2"></i>{seasonData.children.length === 1 ? <span>Watch S{season_index_no}.E1</span> : <span>Start Watching S{season_index_no}.E1</span>}</Button>}
                                {<Link to={"/serie/" + serieId}><Button className="season-btn secondary-button" variant="light"><i className="bi bi-chevron-left pe-2"></i><span>Bact to Details</span></Button></Link>}
                                </span>
                                </Row>
                            </Col>
                            <div className="season-buttons d-flex justify-content-between">
                                {+index_no > 0 && seasonData && seasonData.parent_children && seasonData.parent_children[+index_no - 1] && seasonData.parent_children[+index_no - 1].id && <Link to={"/serie/" + serieId + "/season/" + seasonData.parent_children[+index_no - 1].id + "?index_no=" + (+index_no - 1) +  "&season_no=" + getSeasonNumber(seasonData.parent_children[+index_no - 1].name,+index_no - 1) + "&api_id=" + api_id + "&serie_name=" + serie_name}><Button className="season-btn secondary-button" variant="dark"><i className="bi bi-chevron-left pe-2"></i>Previous Season</Button></Link>}
                                {seasonData && seasonData.parent_children && +index_no < seasonData.parent_children.length && seasonData.parent_children[+index_no + 1] && <Link to={"/serie/" + serieId + "/season/" + seasonData.parent_children[+index_no + 1].id + "?index_no=" + (+index_no + 1) +  "&season_no=" + getSeasonNumber(seasonData.parent_children[+index_no + 1].name,+index_no + 1) + "&api_id=" + api_id + "&serie_name=" + serie_name}><Button className="season-btn secondary-button" variant="dark">Next Season<i className="bi bi-chevron-right ps-2"></i></Button></Link>}
                            </div>
                            <span className="item-season-overview mobile-display"><b>Overview</b> - {seasonTmdbData.overview || "No Overview Available"}</span>
                        </Row>
                    </Col>
                    {seasonTmdbData && seasonTmdbEpisodes && (
                        <Episodes showPlayer={showPlayer} setShowPlayer={setShowPlayer} episodesData={seasonEpisodes} episodesTmdbData={seasonTmdbEpisodes}/>
                    )}
                </Row>
            </Container>
            )}
        </>
    );
};

export default SeasonsDetails;