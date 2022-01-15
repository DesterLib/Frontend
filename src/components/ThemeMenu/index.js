import React, { Component } from "react";

import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import { Dropdown, DropdownButton, ListGroup } from "react-bootstrap";

export default class ThemeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: false,
      ui_config: props.ui_config,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }

  handleClick(evt) {
    this.setState({
      menuAnchor: evt.currentTarget,
    });
  }

  handleClose(evt) {
    this.setState({
      menuAnchor: false,
    });
  }

  handleTheme(name) {
    this.setState({
      menuAnchor: false,
    });
    window.localStorage.setItem("theme", name);
    window.sessionStorage.setItem("theme", name);
    window.location.reload();
  }

  render() {
    let { menuAnchor, ui_config } = this.state;

    return (
      <div className="ThemeMenu">
        {/* <IconButton
          aria-label="more"
          aria-controls="theme-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Brightness6Icon />
        </IconButton> */}
        {/* <Menu
          id="theme-menu"
          anchorEl={menuAnchor}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.handleTheme("light")}>Light</MenuItem>
          <MenuItem onClick={() => this.handleTheme("dark")}>Dark</MenuItem>
          <MenuItem onClick={() => this.handleTheme("dracula")}>
            Dracula
          </MenuItem>
          <MenuItem onClick={() => this.handleTheme("nord")}>Nord</MenuItem>
        </Menu> */}
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <Brightness6Icon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.handleTheme("dark")}>Dark</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
