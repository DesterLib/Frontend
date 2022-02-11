import React, { useCallback, useState } from 'react';
import { Badge, Button, Col, Container, Figure, Row } from 'react-bootstrap';
import Artplayer from "artplayer/examples/react/Artplayer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./style.css"
import { createPortal } from 'react-dom';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { PLACEHOLDER_BACKDROP, PLACEHOLDER_POSTER } from '../../../config';

const EpisodeWatch = () => {

    const [art, setArt] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [seasonData, setSeasonData] = useState({});
    const [seasonTmdbData, setSeasonTmdbData] = useState({});
    const [seasonEpisodes, setSeasonEpisodes] = useState([]);
    const [seasonTmdbEpisodes, setSeasonTmdbEpisodes] = useState([]);
    const [videoData, setVideoData] = useState({});
    const handle = useFullScreenHandle();
    const [searchParams, setSearchParams] = useSearchParams();

    const index_no = searchParams.get("index_no");
    const season_index_no = searchParams.get("season_no");
    const episode_index = searchParams.get("episode_index");
    const serie_name = searchParams.get("serie_name");
    const api_id = searchParams.get("api_id");

    const location = useLocation();
    const serieId = location.pathname.split("/")[2];
    const seasonId = location.pathname.split("/")[4];
    const episodeId = location.pathname.split("/")[6];
    
    useEffect(() => {
        const backend_url = process.env.REACT_APP_BACKEND;
        const tmdbkey = process.env.REACT_APP_TMDB;
        function getSeasons() {
            axios.get(`${backend_url}/api/v1/metadata?id=${seasonId}`)
            .then(function(response) {
                if(seasonEpisodes.length > 0) {
                    axios.get(`${backend_url}/api/v1/streammap?auth=0&id=${seasonEpisodes[+episode_index].id}&parent=${serieId}&name=${serie_name}&server=${backend_url}`)
                    .then(function(response) {
                        setVideoData(response.data.content)
                    })
                }
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
                setSeasonTmdbEpisodes(response.data.episodes)
            })
            .catch(function(error) {
                console.log(error)
            })
        }
        getSeasons()
        getTmdbSeasons()
    },[api_id,episode_index,seasonEpisodes.length,seasonId,season_index_no,serieId,serie_name])

    let sources = []

    if (videoData && videoData.videos) {
        sources = videoData.videos
        .map((source)=>({
            html: source.name,
            url: source.url
        }))
    }

    const VideoHeader = () => {
        return (
            <div className="video-player-header art-control">
                <Link to={"/serie/" + serieId + "/season/" + seasonId + "?index_no=" + index_no +  "&season_no=" + season_index_no + "&api_id=" + api_id + "&serie_name=" + serie_name}><Button><i className="bi bi-arrow-left-short"></i></Button></Link>
                <div><h5>S{seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].season_number : season_index_no}.E{seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].episode_number : episode_index} {seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].name : seasonEpisodes[+episode_index].name} | {serie_name}</h5></div>
            </div>
        )
    }

    const PrevControl = () => {
        return (
            <>
            <a href={"/serie/" + serieId + "/season/" + seasonId + "/episode/" + seasonEpisodes[+episode_index - 1].id + "?&season_no=" + (seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].season_number : season_index_no) + "&api_id=" + api_id + "&serie_name=" + serie_name + "&episode_index=" + (seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].episode_number - 2 : episode_index - 2)} className="next-episode-control">
                <Figure className="d-flex next-episode-figure">
                    <Figure.Image
                        width={171}
                        src={seasonTmdbEpisodes[+episode_index] ? "https://www.themoviedb.org/t/p/w500" + seasonTmdbEpisodes[+episode_index - 1].still_path : PLACEHOLDER_BACKDROP}
                    />
                    <Figure.Caption className="ps-3 d-flex flex-column">
                        <span>Prev Episode</span>
                        E{seasonTmdbEpisodes[+episode_index - 1] ? seasonTmdbEpisodes[+episode_index - 1].episode_number : episode_index - 1} {seasonTmdbEpisodes[+episode_index - 1] ? seasonTmdbEpisodes[+episode_index - 1].name : seasonEpisodes[+episode_index - 1].name}
                        <Badge bg='dark'>S{seasonTmdbEpisodes[+episode_index - 1].season_number}.E{seasonTmdbEpisodes[+episode_index - 1].episode_number}</Badge>
                    </Figure.Caption>
                </Figure>
                <i className="video-player-icon bi bi-skip-start-fill"></i>
            </a>
            </>
        )
    }

    const NextControl = () => {
        return (
            <>
            <a href={"/serie/" + serieId + "/season/" + seasonId + "/episode/" + seasonEpisodes[+episode_index + 1].id + "?&season_no=" + seasonTmdbEpisodes[+episode_index].season_number + "&api_id=" + api_id + "&serie_name=" + serie_name + "&episode_index=" + seasonTmdbEpisodes[+episode_index].episode_number} className="next-episode-control">
                <Figure className="d-flex next-episode-figure">
                    <Figure.Image
                        width={171}
                        src={seasonTmdbEpisodes[+episode_index] ? "https://www.themoviedb.org/t/p/w500" + seasonTmdbEpisodes[+episode_index + 1].still_path : PLACEHOLDER_BACKDROP}
                    />
                    <Figure.Caption className="ps-3 d-flex flex-column">
                        <span>Next Episode</span>
                        E{seasonTmdbEpisodes[+episode_index + 1].episode_number} {seasonTmdbEpisodes[+episode_index + 1].name}
                        <Badge bg='dark'>S{seasonTmdbEpisodes[+episode_index + 1].season_number}.E{seasonTmdbEpisodes[+episode_index + 1].episode_number}</Badge>
                    </Figure.Caption>
                </Figure>
                <i className="video-player-icon bi bi-skip-end-fill"></i>
            </a>
            </>
        )
    }

    const FullscreenControl = () => {
        return (
            <>
            {fullscreen ? 
            <Button className="plain-button" onClick={handle.exit}>
                <div className="art-control art-control-fullscreen ps-4" data-index="70">
                    <i className="video-player-icon bi bi-fullscreen-exit"></i>
                </div>
            </Button>
            :
            <Button className="plain-button" onClick={handle.enter}>
                <div className="art-control art-control-fullscreen ps-4" data-index="70">
                    <i className="video-player-icon bi bi-arrows-fullscreen"></i>
                </div>
            </Button>
            }
            </>
        )
    }

    const reportChange = useCallback((state, handle) => {
        if (handle && state === true) {
            setFullscreen(true)
        }
        if (handle && state === false) {
            setFullscreen(false)
        }
    }, []);

    return (
        <div className="page-bottom-margin">
        <FullScreen className="episode-container" handle={handle} onChange={reportChange}>
        <Container fluid className={fullscreen ? 'episode-watch-video video-full-height' : 'episode-watch-video video-ratio ratio ratio-21x9'}>
            {seasonEpisodes.length > 0 && videoData && videoData.videos ? (
                <>
                <Artplayer
                className="video-player-style"
                option={{
                    url: `${videoData.videos[0].url}`,
                    aspectRatio: true,
                    hotkey: true,
                    whitelist: ['*'],
                    playbackRate: true,
                    localSubtitle: true,
                    theme: "var(--accent)",
                    quality: sources,
                    layers: [
                        {
                            html: "",
                            name: "header"
                        }
                    ],
                    controls: [
                        {
                            position: "right",
                            name: "fullscreen",
                            html: ""
                        },
                        {
                            position: "left",
                            name: "prev",
                            html: ""
                        },
                        {
                            position: "left",
                            name: "next",
                            html: ""
                        }
                    ],
                    icons: {
                        state: '<i class="video-player-state-icon bi bi-play-fill"></i>',
                        play: '<i class="video-player-icon bi bi-play-fill"></i>',
                        pause: '<i class="video-player-icon bi bi-pause-fill"></i>',
                        volume: '<i class="video-player-icon bi bi-volume-down-fill"></i>',
                        volumeClose: '<i class="video-player-icon bi bi-volume-mute-fill"></i>',
                    },
                }}
                getInstance={(art) => {
                    art.on("ready", () => setArt(art));
                }}
            />
            {art ? createPortal(<VideoHeader />, art.layers.header) : null}
            {art && +episode_index !== 0 && seasonEpisodes[+episode_index - 1] && seasonEpisodes[+episode_index - 1].id ? createPortal(<PrevControl />, art.controls.prev) : null}
            {art && +episode_index + 1 < seasonEpisodes.length && seasonEpisodes[+episode_index + 1] && seasonEpisodes[+episode_index + 1].id ? createPortal(<NextControl />, art.controls.next) : null}
            {art ? createPortal(<FullscreenControl />, art.controls.fullscreen) : null}
            </>
            ) : (<></>)}
        </Container>
        </FullScreen>
        <div className="episode-watch-info p-3 p-lg-4">
            <Container>
            {seasonEpisodes && seasonTmdbEpisodes && seasonEpisodes.length > 0 && seasonTmdbEpisodes.length > 0 && (
                <Row>
                    <Col className="pt-2 pb-4" md={7}>
                        <a href="/#"><h6>{serie_name}</h6></a>
                        <h4 className="episode-watch-title">S{seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].season_number : season_index_no}.E{seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].episode_number : episode_index} {seasonTmdbEpisodes[+episode_index] ? seasonTmdbEpisodes[+episode_index].name : seasonEpisodes[+episode_index].name}</h4>
                        <span className="episode-watch-overview">
                            {seasonTmdbEpisodes[+episode_index] && seasonTmdbEpisodes[+episode_index].overview}
                        </span>
                        <br/>
                        <span>TV-PG</span>
                        <br/>
                        <span>Subtitles Unavailable</span>
                    </Col>
                    {+episode_index + 1 < seasonEpisodes.length ? (
                        <Col md={5}>
                            <h5>Next Episode</h5>
                            <a href={"/serie/" + serieId + "/season/" + seasonId + "/episode/" + seasonEpisodes[+episode_index + 1].id + "?&season_no=" + seasonTmdbEpisodes[+episode_index].season_number + "&api_id=" + api_id + "&serie_name=" + serie_name + "&episode_index=" + seasonTmdbEpisodes[+episode_index].episode_number} className="next-episode-control">
                            <Figure className="d-flex episode-figure">
                                <Figure.Image
                                    width={171}
                                    src={"https://www.themoviedb.org/t/p/w500" + seasonTmdbEpisodes[+episode_index + 1].still_path}
                                />
                                <Figure.Caption className="ps-3 d-flex flex-column">
                                    E{seasonTmdbEpisodes[+episode_index + 1].episode_number} - {seasonTmdbEpisodes[+episode_index + 1].name}
                                    <Badge bg='dark'>S{seasonTmdbEpisodes[+episode_index + 1].season_number}.E{seasonTmdbEpisodes[+episode_index + 1].episode_number}</Badge>
                                </Figure.Caption>
                            </Figure>
                            </a>
                            <Button variant="dark"><i className="bi bi-collection-play-fill me-2"></i>Show All Episodes</Button>
                        </Col>
                    ) : (
                        <Col md={5}>
                            <h5>No Next Episode</h5>
                            <Button variant="dark"><i className="bi bi-collection-play-fill me-2"></i>Show All Episodes</Button>
                        </Col>
                    )}
                </Row>
            )}
            </Container>
        </div>
        </div>
    );
};

export default EpisodeWatch;