import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Modal, Ratio, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Navigation, Paragraph, Seasons, Slider } from '../../components';
import { getSeasonNumber, guid } from '../../utilities';
import "./style.css";
import ItemWatch from '../ItemWatch/ItemWatch';
import { LoadingHome } from '../../components/Loading';

const ItemDetails = ({ type }) => {

    const [itemData, setItemData] = useState({});
    const [itemError, setItemError] = useState({});
    const [tmdbData, setTmdbData] = useState({});
    const [tmdbError, setTmdbError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [trailer, setTrailer] = useState({});
    const [trailerError, setTrailerError] = useState({});
    const [seasons, setSeasons] = useState([])
    const [seasonEpisodes, setSeasonEpisodes] = useState([]);

    const handleShowPlayer = () => setShowPlayer(true);

    const backend_url = process.env.REACT_APP_BACKEND;
    const tmdbkey = process.env.REACT_APP_TMDB;

    const handleCloseTrailer = () => setShowTrailer(false);
    const handleShowTrailer = () => setShowTrailer(true);

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchMainApi = () => {
            setIsLoading(true)
            axios.get(`${backend_url}/api/v1/metadata?id=${id}`)
            .then(function(response) {
                if(response.data.content.apiId !== 'undefined' && response.data.content.api === "tmdb") {
                    let tmdbId = response.data.content.apiId
                    axios.get(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${tmdbkey}&append_to_response=credits,images,episode_groups&include_image_language=en`)
                    .then(function (response) {
                        setTmdbData(response.data);
                    })
                    .catch(function (error) {
                        setTmdbError(error);
                    })
                }
                if(itemData && (itemData.apiId !== 'null' || 'undefined')) {
                    axios.get(`${backend_url}/api/v1/trailer/${itemData.apiId}?a=0&t=${type}&api=${itemData.api}`)
                    .then(function(response) {
                        setTrailer(response.data)
                    })
                    .catch(function(error) {
                        setTrailerError(error)
                    })
                }
                if(type === "tv" && itemData.children) {
                    setSeasons(itemData.children)
                    if(itemData.children && itemData.children.length > 0) {
                        axios.get(`${backend_url}/api/v1/metadata?id=${itemData.children[0].id}`)
                        .then(function(response) {
                            setSeasonEpisodes(response.data.content)
                        })
                    }
                }
                setItemData(response.data.content)
                setIsLoading(false)
            })
            .catch(function(error) {
                setItemError(error)
            })
        }
        fetchMainApi()
    }, [backend_url,id,tmdbkey,type,itemData.apiId,itemData.api])

    if(isLoading) return <LoadingHome isLoading={isLoading}/>

    return (
        <Container fluid className="item-container p-0 page-bottom-margin">
            {((Object.keys(itemData).length > 0 && Object.keys(tmdbData).length > 0) || (itemData.api === "anilist")) && (
                <>
                    <Navigation/>
                    <Row className="item-bg-container" style={{backgroundImage: `url("${itemData.backdropPath}")`, backgroundSize: itemData.api === "anilist" ? "cover" : "contain", backgroundPosition:  itemData.api === "anilist" ? "center" : "right"}}>
                        <Col className="item-shadow-container" lg={{span: 8, order: 2}}>
                            <img src={itemData.backdropPath} alt=""/>
                            <div className="item-bg-shadow"></div>
                        </Col>
                        <Col lg={{ span: 4, order: 1}} className="item-info-container">
                            <span className="item-logo-main">
                                {tmdbData.images && tmdbData.images.logos && tmdbData.images.logos.length > 0 ? 
                                    <span>
                                        <img src={"https://image.tmdb.org/t/p/w500" + tmdbData.images.logos[0].file_path} alt=""/>
                                        <br/>
                                        <span style={{fontSize: "24px", color: "#ffffff"}}>{itemData.title}</span>
                                    </span> 
                                    : 
                                    <span className="item-title">{itemData.title}</span>
                                }
                            </span>
                            <div><span className="item-year">{itemData.releaseDate.substring(0,4)}</span><span className="break">|</span><span className="item-age-rating">{itemData.adult ? "R" : "PG"}</span></div>
                            <span className="item-overview">{itemData.overview}</span>
                            <div className="button-actions-container">
                            {type === "movie" && (<Button className="primary-button mobile-display" onClick={() => handleShowPlayer()}><i className="bi bi-play-fill"></i><span>Play Now</span></Button>)}
                            {type === "tv" && itemData && seasons && seasons[0] && seasonEpisodes && seasonEpisodes.parent_children && seasonEpisodes.parent_children[0] && (<Link className="m-0" to={"/serie/" + id + "/season/" + seasons[0].id + "/episode/" + seasonEpisodes.parent_children[0].id + "?index_no=0&season_no=" + getSeasonNumber(seasons[0].name,1) + "&api_id=" + itemData.apiId + "&serie_name=" + itemData.name + "&episode_index=0"}><Button className="primary-button mobile-display"><i className="bi bi-play-fill"></i><span>Start Watching S1.E1</span></Button></Link>)}
                            <div className="d-flex">
                                {type === "movie" && (<Button className="primary-button desktop-display" onClick={() => handleShowPlayer()}><i className="bi bi-play-fill"></i><span>Play Now</span></Button>)}
                                {type === "tv" && itemData && seasons && seasons[0] && seasonEpisodes && seasonEpisodes.parent_children && seasonEpisodes.parent_children[0] && (<Link className="me-3" to={"/serie/" + id + "/season/" + seasons[0].id + "/episode/" + seasonEpisodes.parent_children[0].id + "?index_no=0&season_no=" + getSeasonNumber(seasons[0].name,1) + "&api_id=" + itemData.apiId + "&serie_name=" + itemData.name + "&episode_index=0"}><Button className="primary-button desktop-display"><i className="bi bi-play-fill"></i><span>Start Watching S1.E1</span></Button></Link>)}
                                <Button className="secondary-button" onClick={handleShowTrailer}><i className="bi bi-youtube"></i><span>Trailer</span></Button>
                                <Button className="secondary-button" variant="dark"><i className="bi bi-cloud-arrow-down-fill"></i><span>Download</span></Button>
                                <Button className="secondary-button" disabled variant="dark"><i className="bi bi-plus-lg"></i></Button>
                            </div>
                            </div>
                        </Col>
                    </Row>
                    <Modal className="video-player-modal" size="xl" show={showPlayer} fullscreen={fullscreen}>
                        <Modal.Body>
                            <ItemWatch itemType={type} itemData={itemData} tmdbData={tmdbData} showPlayer={showPlayer} setShowPlayer={setShowPlayer}/>
                        </Modal.Body>
                    </Modal>
                    {itemData && type === "tv" && seasons && (
                        <Seasons parentName={itemData.name} apiId={itemData.apiId} parentId={itemData.id} seasons={seasons} tmdbSeasons={tmdbData.seasons}/>
                    )}
                    <Row className="item-additional-info-container">
                        <Col className="info-container-left" lg={6}>
                            <div className="item-additional-info-title">
                                <span><i className="bi bi-info-square-fill me-2"></i>Info</span>
                            </div>
                            <Row>
                                <Col className="p-0" xs={4}>
                                    <div className="item-poster-container">
                                        <img className="img-fluid" src={itemData.posterPath} alt="" />
                                    </div>
                                </Col>
                                <Col xs={8}>     
                                    <span className="item-title">{itemData.title}</span>
                                    <span className="genre-group">
                                        {itemData.genres.map((genre) => (
                                            <a href="/#" key={guid()}><Badge pill text="light"><i className="bi bi-record-circle-fill pe-1"></i>{genre}</Badge></a>
                                        ))}
                                    </span>
                                    <span><b>Release Date</b> - {itemData.releaseDate}</span>
                                    <span className="desktop-display"><b>Overview</b> - <Paragraph text={itemData.overview} /></span>
                                </Col>
                                <span className="mobile-display"><b>Overview</b> - <Paragraph text={itemData.overview} /></span>
                            </Row>
                        </Col>
                        <Col className="info-container-right" lg={6}>
                            <div className="item-trailer-container">
                                <div className="item-additional-info-title">
                                    <span><i className="bi bi-youtube me-2"></i>Trailer</span>
                                </div>
                                <Col className="item-trailer-video">
                                    <Ratio aspectRatio="16x9">
                                        <div>
                                            <div className="middle">
                                                <i className="bi bi-play-fill"></i>
                                            </div>
                                        </div>
                                    </Ratio>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {tmdbData && tmdbData.credits && (
                            <Slider type="people" metadata={tmdbData.credits.cast}/>
                        )}
                    </Row>
                    <Modal size="xl" show={showTrailer} onHide={handleCloseTrailer}>
                        <Modal.Header closeButton>
                            <Modal.Title>Trailer <span className="break">|</span> {itemData.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {trailer && trailer.code === 200 && trailer.content && trailer.content.key ? (
                                <Ratio aspectRatio="16x9">
                                    <iframe width="100%" height="500px" src={"https://www.youtube.com/embed/" + trailer.content.key} title={itemData.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </Ratio>
                            ) : (
                                <span>Sorry ! Trailer Not Found</span>
                            )}
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default ItemDetails;