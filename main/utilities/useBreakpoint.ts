import { useEffect, useState } from 'react';

const breakpoints = {
    0: 'xs',
    600: 'sm',
    900: 'md',
    1200: 'lg',
    1536: 'xl',
};

const useBreakpoint = () => {
    const [breakpoint, setBreakPoint] = useState<any>('');
    const [windowSize, setWindowSize] = useState<any>({
        width: undefined,
        height: undefined,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        if (0 < windowSize.width && windowSize.width < 600) {
            setBreakPoint(breakpoints[0]);
        }
        if (600 < windowSize.width && windowSize.width < 900) {
            setBreakPoint(breakpoints[600]);
        }
        if (900 < windowSize.width && windowSize.width < 1200) {
            setBreakPoint(breakpoints[900]);
        }
        if (1200 < windowSize.width && windowSize.width < 1536) {
            setBreakPoint(breakpoints[1200]);
        }
        if (windowSize.width >= 1536) {
            setBreakPoint(breakpoints[1536]);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [windowSize.width]);
    return breakpoint;
};

export default useBreakpoint;
