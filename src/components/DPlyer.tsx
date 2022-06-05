import Artplayer from 'artplayer';
import React, { useEffect, useRef } from 'react';

const DPlayer = ({ option, getInstance, ...rest }: any) => {
    const artRef = useRef();

    useEffect(() => {
        const art = new Artplayer({
            ...option,
            container: artRef.current,
        });

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, [option, getInstance]);

    return <div ref={artRef} {...rest}></div>;
};

export default DPlayer;
