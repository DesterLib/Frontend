import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import Brightness6Icon from '@material-ui/icons/Brightness6';

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
