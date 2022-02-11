import React, { useState } from 'react';
import Artplayer from "artplayer/examples/react/Artplayer";
import "./style.css"
import { Button, Container } from 'react-bootstrap';
import ReactFullscreen from 'react-easyfullscreen';
import { useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';

const ItemWatch = ({episodesData, itemType, itemData, tmdbData, showPlayer, setShowPlayer}) => {

    const [videoData, setVideoData] = useState({});
    const [art, setArt] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const episode_index = searchParams.get("episode_index");
    const prev_episode_index = +episode_index - 1;
    const next_episode_index = +episode_index + 1;

    function handleClosePlayer(onExit) {
        if(showPlayer) setShowPlayer(false);
        onExit();
    }

    function nextEpisode() {
        const backend_url = process.env.REACT_APP_BACKEND;
        if (itemType === "tv" && episodesData && episodesData[episode_index]) {
            axios.get(`${backend_url}/api/v1/streammap?auth=0&id=${episodesData[next_episode_index].id}&parent=${itemData.parentId}&name=${itemData.name}&server=${backend_url}`)
            .then(function(response) {
                setVideoData(response.data.content)
            })
        }
    }
    
    useEffect(() => {
        const backend_url = process.env.REACT_APP_BACKEND;
        if(itemType === "movie") {
            axios.get(`${backend_url}/api/v1/streammap?auth=0&id=${itemData.id}&name=${itemData.name}&server=${backend_url}`)
            .then(function(response) {
                setVideoData(response.data.content)
            })
            itemData.parentId = null
        } else if (itemType === "tv" && episodesData && episodesData[episode_index]) {
            axios.get(`${backend_url}/api/v1/streammap?auth=0&id=${episodesData[episode_index].id}&parent=${itemData.parentId}&name=${itemData.name}&server=${backend_url}`)
            .then(function(response) {
                setVideoData(response.data.content)
            })
        }
    }, [videoData, itemData.id ,itemData.name, itemData.parentId])

    let sources = []

    if (videoData && videoData.videos) {
        sources = videoData.videos
        .map((source)=>({
            html: source.name,
            url: source.url
        }))
    }

    let videoLogo = '';

    const defaultLoadingLogo = '<svg style="max-width: 100px" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <circle fill="#fff" stroke="none" cx="6" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/> </circle> <circle fill="#fff" stroke="none" cx="26" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/> </circle> <circle fill="#fff" stroke="none" cx="46" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/> </circle> </svg>';

    itemType === "movie" && tmdbData.images && tmdbData.images.logos && tmdbData.images.logos.length > 0 ? videoLogo = `<img class="video-player-logo" src="https://image.tmdb.org/t/p/w500${tmdbData.images.logos[0].file_path}" alt="Video-Logo">` : videoLogo = defaultLoadingLogo

    const VideoHeader = ({onExit}) => {
        return (
            <div className="video-player-header art-control">
                <Button onClick={() => (handleClosePlayer(onExit))}><i className="bi bi-arrow-left-short"></i></Button>
                <div>{itemType === "movie" && itemData.title}</div>
                {tmdbData && tmdbData[episode_index] && (<div>{itemType === "tv" && tmdbData[episode_index].name}</div>)}
            </div>
        )
    }

    const VideoEpisodeNavigation = () => {
        return (
            <div className="video-player-episode-controls d-flex justify-content-between art-control">
                <Button className="season-btn secondary-button" variant="dark"><i className="bi bi-chevron-left"></i>Previous</Button>
                <Button onClick={() => (nextEpisode())} className="season-btn secondary-button" variant="dark">Next<i className="bi bi-chevron-right"></i></Button>
            </div>
        )
    }
    
    return (
        <ReactFullscreen>
            {({ onExit, onToggle }) => (
                <Container fluid className="current-video-player">
                    {videoData && videoData.videos && sources && (
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
                                    },
                                    {
                                        html: "",
                                        name: "controls"
                                    }
                                ],
                                controls: [
                                    {
                                        position: 'right',
                                        html: '<div class="art-control art-control-fullscreen ps-4" data-index="70"><i class="video-player-icon bi bi-arrows-fullscreen"></i></div>',
                                        tooltip: 'Fullscreen',
                                        click: function() {
                                            onToggle()
                                        }
                                    },
                                ],
                                icons: {
                                    loading: `${videoLogo}`,
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
                        {art ? createPortal(<VideoHeader onExit={onExit} />, art.layers.header) : null}
                        {art && itemType === "tv" ? createPortal(<VideoEpisodeNavigation/>, art.layers.controls) : null}
                        </>
                    )}
                </Container>
            )}
        </ReactFullscreen>
    );

};

export default ItemWatch;
