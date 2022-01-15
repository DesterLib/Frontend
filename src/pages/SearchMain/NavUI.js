import React, { Component } from "react";

import { Link } from "react-router-dom";

import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import {
  guid,
  Nav,
} from "../../components";
import { FormControl, InputGroup } from "react-bootstrap";
import "./style.css"

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.main, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.main, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "15vw",
    maxWidth: "500px",
  },
});

class NavUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      ui_config: JSON.parse(
        window.localStorage.getItem("ui_config") ||
          window.sessionStorage.getItem("ui_config") ||
          "{}"
      ),
    };
    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchChange(evt) {
    this.setState({ search: evt.target.value });
  }

  searchSubmit(evt) {
    evt.preventDefault();
    if (!(this.state.search == "" || this.state.search == null)) {
      this.props.history.push({
        pathname: `/search/${this.state.search}`,
        key: guid(),
      });
    }
  }

  render() {
    let { accounts, categories, query, search, ui_config } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Nav {...this.props} />
      <div className="search-wrapper">
        <form onSubmit={this.searchSubmit}>
        <InputGroup className="mb-3 sugoi-search-bar">
              <InputGroup.Text id="inputGroup-sizing-default"><i className="color-2 gg-search"></i></InputGroup.Text>
              <FormControl
                  placeholder="Search..."
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={this.searchChange}
              />
          </InputGroup>
        </form>
      </div>
      </div>
    );
  }
}

export default (NavUI);