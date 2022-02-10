import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  guid,
} from "../../components";
import { Badge, Container, Dropdown, DropdownButton, Nav, Navbar } from "react-bootstrap";
import './style.css'
import { APP_LOGO_FULL } from "../../config";
import ThemeMenu from "../ThemeMenu";
import AccountMenu from "../AccountMenu";
import BrowseMenu from "../BrowseMenu";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  navbar: {
    backgroundColor: '#14dca0',
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
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
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

  onMouseOver(evt) {
    evt.target.style.width = "20vw";
  }

  onMouseOut(evt) {
    evt.target.style.width = "15vw";
  }

  render() {
    let { accounts, categories, query, search, ui_config } = this.state;
    const { classes } = this.props;

    return (
        <Navbar expand="lg" variant="dark">
          <Container fluid className="d-container">
              <Navbar.Brand as={Link} to="/">
                  <img src={APP_LOGO_FULL} width="180" className="logo-full d-inline-block align-top" alt="Dester Logo-Full"/>
                  <Badge key={guid()} pill bg="primary">v1</Badge>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link as={Link} to="/"><i className="icon-navbar color-1 gg-home-alt"></i>Home</Nav.Link>
                      <Nav.Link as={Link} to="/search"><i className="icon-navbar color-2 gg-search"></i>Search</Nav.Link>
                  </Nav>
                  <BrowseMenu categories={categories} />
                  <AccountMenu accounts={accounts} ui_config={ui_config} />
                  <ThemeMenu ui_config={ui_config} />
              </Navbar.Collapse>
          </Container>
      </Navbar>
    );
  }
}

export default (NavUI);
