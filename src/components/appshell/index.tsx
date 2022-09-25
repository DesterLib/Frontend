import { Box, useTheme } from '@mui/material';
import app from '../../main/config';
import React from 'react';

import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';

type AppShellProps = {
    children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const navBarRef = React.useRef<any>(null);
    const sideBarRef = React.useRef<any>(null);
    const [navBarWidth, setNavBarWidth] = React.useState(0);
    const [sideBarWidth, setSideBarWidth] = React.useState(0);
    const [openSideBar, setOpenSideBar] = React.useState<boolean>(false);
    const handleOpenSideBar = () => {
        setOpenSideBar((openSideBar) => !openSideBar);
    };

    // To-Do - Convert this to a reusable react hook
    function getDimensions(property: 'width' | 'height', ref: any, setState: any) {
        const observer = new ResizeObserver((entries) => {
            setState(entries[0].contentRect[property]);
        });
        observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }

    React.useEffect(() => {
        getDimensions('height', navBarRef, setNavBarWidth);
        getDimensions('width', sideBarRef, setSideBarWidth);
    }, []);

    const theme = useTheme();
    return (
        <Box sx={{ padding: '5px', overflow: 'hidden' }}>
            <NavBar ref={navBarRef} logo={app.logo} handleOpenSideBar={handleOpenSideBar} />
            <SideBar
                sideBarLabels={openSideBar}
                sx={{
                    height: 'calc(100vh - 75px)',
                    marginTop: '5px',
                    [theme.breakpoints.down('md')]: {
                        display: 'none',
                    },
                }}
                ref={sideBarRef}
            />
            <Box
                sx={{
                    width: `calc(100% - ${sideBarWidth}px)`,
                    height: `calc(100vh - ${navBarWidth}px - 10px)`,
                    padding: '5px',
                    paddingBottom: '0px',
                    paddingRight: '0px',
                    marginLeft: `${sideBarWidth}px`,
                    overflow: 'auto',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AppShell;
