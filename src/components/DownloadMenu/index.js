import React, { Component } from "react";

import { Divider, Menu, MenuItem } from "@material-ui/core";
import { Button, Dropdown } from "react-bootstrap";

import { guid } from "../../components";

export default class DownloadMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: false,
      ...props.state,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSeason = this.handleSeason.bind(this);
  }

  handleClick(evt) {
    this.setState({
      menuAnchor: evt.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      menuAnchor: false,
    });
  }

  handleSeason(evt) {
    evt.preventDefault();
    let { auth, metadata, server } = this.state;
    for (let n = 0; n < metadata.children.length; n++) {
      let req_path = `${server}/api/v1/redirectdownload/${encodeURIComponent(
        metadata.children[n].name
      )}`;
      let req_args = `?a=${auth}&id=${metadata.children[n].id}`;

      window.open(req_path + req_args);
    }
    this.setState({
      menuAnchor: evt.currentTarget,
    });
  }

  render() {
    let { menuAnchor, videos } = this.state;

    return (
      <div className="info__button">
        <Button
          variant="primary"
          aria-controls="download-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <i className="bi bi-cloud-arrow-down-fill"></i>Download
        </Button>
        <Menu
          id="download-menu"
          anchorEl={menuAnchor}
          keepMounted
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(menuAnchor)}
          onClose={this.handleClose}
        >
          {videos.length
            ? videos.map((source, n) => (
                <div key={guid()}>
                  <a
                    href={encodeURI(source.url)}
                    className="no_decoration_link"
                    target="_blank"
                  >
                    <MenuItem onClick={this.handleClose}>
                      {source.name}
                    </MenuItem>
                  </a>
                  <div>{n == 0 && videos.length > 1 ? <Divider /> : null}</div>
                </div>
              ))
            : null}
          {this.props.tv ? (
            <div>
              <Divider />
              <MenuItem onClick={this.handleSeason}>Entire Season</MenuItem>
            </div>
          ) : null}
        </Menu>
      </div>
    );
  }
}
