import { ThemeContext } from 'main/theme/ThemeContext';
import React, { useContext } from 'react';

// import NavBar from 'components/navbar';

type Props = {};

const HomePage = (props: Props) => {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    return (
        <div>
            {/* <NavBar /> */}
            <div className={`app ${isDarkTheme === true ? 'dark' : 'light'}`}>
                <button
                    className={`button ${isDarkTheme === true ? 'dark' : 'light'}`}
                    onClick={toggleTheme.bind(null)}
                >{`Switch to ${isDarkTheme === true ? 'Light Theme' : 'Dark Theme'}`}</button>
            </div>
        </div>
    );
};

export default HomePage;
