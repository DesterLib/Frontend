import { Box, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DPlayer from '../../components/DPlayer';

const EpisodePage = () => {
    const { seriesId, seasonNumber }: any = useParams();
    const [seriesData, setSeriesData] = useState<any>({});
    const [seasonData, setSeasonData] = useState<any>({});
    // const [episodeData, setEpisodeData] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location: any = useLocation();
    useEffect(() => {
        if (location.state) {
            setSeriesData(location.state.data);
            setSeasonData(location.state.data.seasons[location.state.seasonKey]);
            setIsLoaded(true);
        }
        // } else {
        //     navigate(`/series/${seriesId}/season/${seasonNumber}`);
        // }
    }, [seriesId, seasonNumber]);

    console.log(location.state);
    const videoData = {
        id: 1,
        title: 'Demon slayer',
        subTitle: '',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        playlist: [
            {
                season: 1,
                title: 'Demon slayer',
                description: '',
                episodes: [
                    {
                        episode: 1,
                        title: 'No where',
                        description: '',
                        src: [
                            {
                                resolution: '',
                                url: '',
                            },
                        ],
                    },
                ],
            },
            {
                season: 2,
                title: 'Demon slayer',
                description: '',
                episodes: [
                    {
                        episode: 1,
                        title: 'No where',
                        description: '',
                        src: [
                            {
                                resolution: '',
                                url: '',
                            },
                        ],
                    },
                ],
            },
        ],
    };
    return (
        <Box>
            <Toolbar />
            <Box>
                <DPlayer aspectRatio='21/9' videoData={videoData} />
            </Box>
        </Box>
    );
};

export default EpisodePage;
