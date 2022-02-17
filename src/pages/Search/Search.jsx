import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Figure, FormControl, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_POSTER } from '../../config';
import { guid } from '../../utilities';
import "./style.css";

const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('https://somebs.herokuapp.com/api/v1/metadata')
    .then(function(response) {
      setSearchResults(response.data.content)
    })
    .catch(function(error) {
      console.log(error)
    })
  },[])

  const searchItems = (searchValue) => {
    setSearchQuery(searchValue)
    if (searchQuery !== "" && searchQuery !== null) {
      axios.get(`https://somebs.herokuapp.com/api/v1/metadata?auth=0&q=${searchValue}`)
      .then(function(response) {
        setSearchResults(response.data.content)
      })
      .catch(function(error) {
        console.log(error)
      })
    } else {
      axios.get('https://somebs.herokuapp.com/api/v1/metadata')
      .then(function(response) {
        setSearchResults(response.data.content)
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  }

  console.log(searchResults)

  return (
    <Container className="page-bottom-margin p-4 pt-0">
      <div className="search-wrapper">
        <form>
        <InputGroup className="mb-3 sugoi-search-bar">
              <InputGroup.Text id="inputGroup-sizing-default"><i className="color bi bi-search"></i></InputGroup.Text>
              <FormControl
                  className="shadow-none"
                  placeholder="Search..."
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => searchItems(e.target.value)}
              />
          </InputGroup>
        </form>
      </div>
      {searchResults && searchResults.length > 1 && (
        <div>
          {searchResults.map((category, index) => (
            <div key={index}>
              {category && category.children && category.children.length > 0 && (
                <div>
                <h5 className="search-category-title">From: {category.name} ({category.children.length})</h5>
                <Row>
                {console.log(category.categoryInfo.type)}
                  {category.children.slice(0, 6).map((item, index) => (
                    <Col key={index} className="p-lg-4 p-sm-3" xs={6} sm={4} md={3} lg={3} xl={2}>
                      <Link
                        to={`/${item.type === "file" ? "movie" : "serie"}/${
                          item.id
                        }`}
                        key={guid()}
                      >
                        <OverlayTrigger
                            key={guid()}
                            placement="auto-end"
                            overlay={
                                <Tooltip className="hover-overview" id={`tooltip-${guid()}`}>
                                      <div>
                                        <div className="title">{item.title}</div>
                                        <div className="extra-info">{item.type === "file" ? "Movie" : "Serie"}</div>
                                        <div className="genre-badge-container">
                                          {item.genres ? item.genres.map((genre) => (
                                            <Badge key={guid()} pill className="genre-badge">{genre}</Badge>
                                          )) : <></>}
                                        </div>
                                      </div>
                                </Tooltip>
                            }
                        >
                          <Figure className="slider-figure">
                            <div className="card-img mb-2">
                                  <div className="card-info">
                                      <div className="card-rating">
                                              <CircularProgressbar
                                                value={item.api === "tmdb" ? parseInt(item.voteAverage * 10) : parseInt(item.voteAverage)}
                                                text={`${item.api === "tmdb" ? parseInt(item.voteAverage * 10) : parseInt(item.voteAverage)}%`}
                                                  background={true}
                                                  backgroundPadding={5}
                                                  maxValue={100}
                                                  styles={buildStyles({
                                                      rotation: 0.25,
                                                      strokeLinecap: 'butt',
                                                      textSize: '25px',
                                                      pathTransitionDuration: 0.5,
                                                      pathColor: `rgb(20, 220, 160)`,
                                                      textColor: '#ffffff',
                                                      trailColor: '#165764',
                                                      backgroundColor: '#0a2b31',
                                                  })}
                                              />
                                      </div>
                                  </div>
                                  <div className="card-img-image">
                                      <Figure.Image
                                        className="collection-bg-image"
                                        src={item.posterPath !== null ? item.posterPath : PLACEHOLDER_POSTER}
                                        alt={item.title}
                                      />
                                      <div className="middle">
                                          <span className="round-button play-logo-search-item">
                                              <i className="bi bi-play-fill"></i>
                                          </span>
                                      </div>
                                  </div>
                            </div>
                            <Figure.Caption> 
                                <span>{item.title}</span>
                            </Figure.Caption>
                          </Figure>
                        </OverlayTrigger>
                      </Link>
                    </Col>
                  ))}
                </Row>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

export default Search