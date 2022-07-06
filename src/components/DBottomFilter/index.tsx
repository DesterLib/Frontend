import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';

import DButton from '../DButton';
import DSelect from '../DSelect';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function DBottomFilter({
    genres,
    years,
    sortings,
    handleChangeGenre,
    handleChangeYear,
    handleChangeCategory,
    handleChangeSort,
}) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const theme = useTheme();

    const toggleDrawer =
        (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
                padding: '10px 20px',
            }}
            role='presentation'
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    <DSelect
                        title='Genre'
                        currentOption='Any'
                        options={genres}
                        onChange={handleChangeGenre}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <DSelect
                        title='Year'
                        currentOption='Any'
                        options={years}
                        onChange={handleChangeYear}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <DSelect
                        title='Category'
                        currentOption='Any'
                        options={['Any']}
                        onChange={handleChangeCategory}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <DSelect
                        title='Sort'
                        currentOption='Title'
                        options={sortings}
                        onChange={handleChangeSort}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <DSelect
                        title='Sort'
                        currentOption='Title'
                        options={sortings}
                        onChange={handleChangeSort}
                        fullWidth
                    />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                bottom: '70px',
                left: '0px',
                right: '0px',
                zIndex: 1200,
                display: 'flex',
                justifyContent: 'right',
                [theme.breakpoints.up('md')]: {
                    display: 'none',
                },
            }}
        >
            <DButton
                variant='icon'
                startIcon={<span className='material-symbols-rounded'>filter_list</span>}
                sx={{
                    height: '50px',
                    width: '50px',
                    display: 'flex',
                    marginRight: '10px',
                    borderRadius: '50%',
                    padding: '13px',
                    minWidth: '0px',
                    textAlign: 'center',
                }}
                onClick={toggleDrawer('bottom', true)}
            />
            <SwipeableDrawer
                anchor='bottom'
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
            >
                {list('bottom')}
            </SwipeableDrawer>
        </Box>
    );
}
