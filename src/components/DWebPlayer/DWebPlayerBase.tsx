import Box from '@mui/material/Box';
import Artplayer from 'artplayer';
import React, { useEffect, useRef } from 'react';

const DPlayerBase = React.memo(
    function ({ src, subtitle, settings, getInstance, ...rest }: any) {
        const artRef = useRef();

        useEffect(() => {
            const art = new Artplayer({
                ...settings,
                container: artRef.current,
                url: src || '',
                subtitle: {
                    url: subtitle || '',
                    type: 'srt',
                    encoding: 'utf-8',
                },
            });

            if (getInstance && typeof getInstance === 'function') {
                getInstance(art);
            }

            return () => {
                if (art && art.destroy) {
                    art.destroy(false);
                }
            };
        }, [settings, getInstance]);

        return <Box ref={artRef} {...rest} />;
    },
    () => true,
);

DPlayerBase.displayName = 'DPlayerBase';

export default DPlayerBase;
