import React, { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router
} from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Error, Navbar } from './components';
import { Browse, ItemDetails, Search, SeasonsDetails } from './pages';
import { LoadingHome } from './components/Loading';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import EpisodeWatch from './pages/SeasonsDetails/EpisodeWatch/EpisodeWatch';

const axios = require('axios');

const App = () => {

  const backend_url = process.env.REACT_APP_BACKEND;

  const [globalData, setGlobalData] = useState([]);
  const [globalError, setGlobalError] = useState({});
  const [carouselData, setCarouselData] = useState([]);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get(backend_url + '/api/v1/metadata')
      .then(function (response) {
        setGlobalData(response);
        setSliderData(response.data.content);
        setCarouselData(response.data.content[0] || [])
      })
      .catch(function (error) {
        setGlobalError(error);
      })
    }
    fetchData()
  }, [backend_url])

  if(globalData.length === 0 && Object.keys(globalError).length > 0) {
    console.log(globalData)
    console.log(globalError)
    return (<Error error={globalError} errorType="globalError"/>)
  }

  if((globalData.length === 0 && Object.keys(globalError).length === 0) || globalData.length === 0) {
    console.log(globalData)
    console.log(globalError)
    setTimeout(function() {
      return (<Error error={globalError} errorType="dataError"/>)
    }, 1000);
  }

  loadProgressBar()

  return (
    <Router>
        <Navbar type="desktop"/>
          <Routes>
              <Route exact path="/" element={<Browse carouselData={carouselData} sliderData={sliderData}/>}/>
              <Route exact path="/search" element={<Search searchData={globalData}/>}/>
              <Route exact path="/movie/:id" element={<ItemDetails type="movie"/>}/>
              <Route exact path="/serie/:id" element={<ItemDetails type="tv"/>}/>
              <Route exact path="/serie/:id/season/:id" element={<SeasonsDetails/>}/>
              <Route exact path="/serie/:id/season/:id/episode/:id" element={<EpisodeWatch/>}/>
              <Route path='*' element={<>Not Found...</>} />
          </Routes>
        <Navbar type="mobile"/>
    </Router>
  );
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <LoadingHome/>,
});
