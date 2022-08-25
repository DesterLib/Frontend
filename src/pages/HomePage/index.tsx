import app from 'main/config';
import React from 'react';

import NavBar from 'components/navbar';

type Props = {};

const HomePage = (props: Props) => {
    return (
        <div>
            <NavBar logo={app.logo} />
        </div>
    );
};

export default HomePage;
