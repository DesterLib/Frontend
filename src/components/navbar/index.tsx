import LogoFullDark from 'main/assets/logo/logo-full-dark.svg';
import React from 'react';

// const NavBarContainer = styled(Container, {
//     padding: '$md',
//     backgroundColor: '$background',
// });

// const LogoWrapper = styled(Col, {
//     maxWidth: '140px',
// });

// const Logo = styled(Image, {
//     width: '100%',
// });

// const MenuContainer = styled('div', {
//     display: 'flex',
//     '& > *': {
//         marginLeft: '10px',
//     },
// });

type Props = {};

const NavBar = (props: Props) => {
    return (
        <div>
            <div style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <img width='100%' src={LogoFullDark} alt='' />
                </div>
                <div>
                    <button>Hello</button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
