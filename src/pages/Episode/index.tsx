import DPlayer from '@desterlib/dplayer';
import { Box, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DLoader from '../../components/DLoader';
import WPlayer from '../../components/DWebPlayer';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_IS_ELECTRON } from '../../config';
import useBreakpoint from '../../utilities/useBreakpoint';

const EpisodePage = () => {
    const { seriesId, seasonNumber, episodeNumber }: any = useParams();
    const [videoData, setVideoData] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location: any = useLocation();
    const breakpoint = useBreakpoint();

    useEffect(() => {
        if (location.state) {
            const seriesData = location.state.data;
            const episodeData = location.state.item;
            const playlist: any[] = [];
            for (let i = 0; i < seriesData.seasons.length; i++) {
                const currSeason = seriesData.seasons[i];
                const episodes: any[] = [];
                for (let x = 0; x < currSeason.episodes.length; x++) {
                    const currEpisode = currSeason.episodes[x];
                    episodes.push({
                        episode: currEpisode.episode_number,
                        title: currEpisode.name,
                        description: currEpisode.description,
                        thumbnail_path: currEpisode.thumbnail_path,
                        src: [
                            `${APP_API_PATH}${APP_API_VERSION_PATH}/stream/${seriesData.rclone_index}/${currEpisode.path}`,
                        ],
                    });
                }
                playlist.push({
                    season: currSeason.season_number,
                    title: currSeason.name,
                    description: currSeason.description,
                    episodes: episodes,
                });
            }
            console.log(playlist);
            const videoData = {
                id: 1,
                title: seriesData.title,
                subTitle: '',
                url: `${APP_API_PATH}${APP_API_VERSION_PATH}/stream/${seriesData.rclone_index}/${episodeData.path}`,
                playlist: playlist,
            };
            setVideoData(videoData);
            setIsLoaded(true);
        } else {
            navigate(`/series/${seriesId}/season/${seasonNumber}`);
        }
    }, [seriesId, seasonNumber, episodeNumber]);

    return isLoaded ? (
        <Box>
            <Toolbar />
            <Box sx={{ marginTop: breakpoint !== 'xs' && breakpoint !== 'sm' ? '20px' : '0px' }}>
                {APP_IS_ELECTRON ? (
                    <DPlayer
                        url={videoData.url}
                        title={videoData.title}
                        subTitle={videoData.subtitle}
                        id={videoData.id}
                    />
                ) : (
                    <WPlayer aspectRatio='21/9' videoData={videoData} />
                )}
            </Box>
        </Box>
    ) : (
        <DLoader />
    );
};

export default EpisodePage;
