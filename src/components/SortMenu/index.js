import React, { Component } from "react";

import { Link } from "react-router-dom";

import {
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { guid } from "../../components";

import "./index.css";

class SortMenu extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.formatSort = this.formatSort.bind(this);
  }

  formatSort(str) {
    if (!str) {
      return "Sort";
    }
    let str_split = str.split("-");
    for (var i = 0; i < str_split.length; i++) {
      if (str_split[i] == "asc") {
        str_split[i] = "ascending";
      } else if (str_split[i] == "des") {
        str_split[i] = "descending";
      }
      str_split[i] =
        str_split[i].charAt(0).toUpperCase() + str_split[i].substring(1);
    }
    return str_split.join(" ");
  }

  render() {
    let { genre, sort } = this.state;
    const genres = [
      "Action",
      "Action & Adventure",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Ecchi",
      "Family",
      "Fantasy",
      "Hentai",
      "History",
      "Horror",
      "Kids",
      "Mahou Shoujo",
      "Mecha",
      "Music",
      "Mystery",
      "News",
      "Psychological",
      "Reality",
      "Romance",
      "Sci-Fi",
      "Sci-Fi & Fantasy",
      "Science Fiction",
      "Slice of Life",
      "Soap",
      "Sports",
      "Supernatural",
      "TV Movie",
      "Talk",
      "Thriller",
      "War",
      "War & Politics",
      "Western",
    ];

    return (
      <div className="SortMenu">
        <FormControl variant="outlined" className="sort__container">
          <InputLabel id="sort-menu-label">
            {this.formatSort(sort) || "Sort"}
          </InputLabel>
          <Select
            labelId="sort-menu-label"
            id="sort-menu"
            value=""
            label={this.formatSort(sort) || "Sort"}
          >
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=alphabet-asc&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Alphabet Ascending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=alphabet-des&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Alphabet Descending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=date-asc&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Date Ascending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=date-des&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Date Descending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=popularity-asc&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Popularity Ascending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=popularity-des&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Popularity Descending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=vote-asc&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Vote Ascending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=vote-des&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Vote Descending</MenuItem>
            </Link>
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: `?sort=random&genre=${genre}`,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>Random</MenuItem>
            </Link>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="sort__container">
          <InputLabel id="genre-menu-label">{genre || "Genre"}</InputLabel>
          <Select
            labelId="genre-menu-label"
            id="genre-menu"
            value=""
            label={genre || "Genre"}
          >
            <Link
              to={{
                pathname: this.props.props.location.pathname,
                search: ``,
              }}
              key={guid()}
              className="no_decoration_link"
            >
              <MenuItem>All</MenuItem>
            </Link>
            <Divider />
            {genres.map((genre) => (
              <Link
                to={{
                  pathname: this.props.props.location.pathname,
                  search: `?sort=${sort}&genre=${genre}`,
                }}
                key={guid()}
                className="no_decoration_link"
              >
                <MenuItem>{genre}</MenuItem>
              </Link>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles({ withTheme: true })(SortMenu);
